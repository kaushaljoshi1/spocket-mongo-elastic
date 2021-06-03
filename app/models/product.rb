require 'elasticsearch/model'
class Product

  include Mongoid::Document
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks


  #scope :filtered, ->(query_params) { Product::Filter.new.filter(self, query_params) }

  field :title, type: String
  field :price, type: Integer
  field :formatted_price, type: String
  field :formatted_msrp, type: String
  field :image_cover_url, type: String
  field :category_name, type: String
  field :country_origin, type: String
  field :shipping_exclusions, type: Array
  field :premium, type: Mongoid::Boolean
  field :supplier_name, type: String


  def as_indexed_json
    as_json(except: [:id, :_id])
  end

  settings index: { number_of_shards: 1 } do
    mappings dynamic: 'false' do
      indexes :title, type: :text, analyzer: 'english'
      indexes :category_name, type: :keyword
      indexes :supplier_name, type: :keyword
      indexes :premium, type: :boolean
      indexes :shipping_exclusions
      indexes :price, type: :integer
    end
  end

  def self.getBuckets
    categories = []
    suppliers = []
    filters = (Product.search aggs: {
        distinct_category_name: {
            terms: {
                field: "category_name",
                size: 1000
            }
        },
        distinct_supplier_name: {
            terms: {
                field: "supplier_name",
                size: 1000
            }
        }
    })
    filters.aggregations.distinct_category_name.buckets.each { |cat|
      categories << {id: cat['key'], name: cat['key']}
    }

    filters.aggregations.distinct_supplier_name.buckets.each { |sup|
      suppliers << {id: sup['key'], name: sup['key']}
    }

    {categories_hash: categories, suppliers_hash: suppliers}

  end



  def self.filter search
    search_hash = search.slice(:category_name, :title, :supplier_name, :premium, :shipping_exclusions, :minprice, :maxprice, :sort).delete_if { |key, value| value.blank? }
    search_hash_must = search_hash.slice(:category_name, :title, :supplier_name, :premium)
    search_hash_must_not = search_hash.slice(:shipping_exclusions)
    search_hash_range = search_hash.slice(:minprice, :maxprice)
    sort_hash = search_hash.slice(:sort)

    if search_hash.empty?
      products = Product.search query: {
          match_all: {}
      }
    else

      must=Array.new
      must_not=Array.new
      must_range=Array.new
      sort_query = Hash.new

      search_hash_must.each do |k,v|
        must << (Product.build_search k,v)
      end

      search_hash_must_not.each do |k,v|
        must_not << (Product.build_search k,v)
      end
      unless sort_hash.empty?

        sort_query[sort_hash[:sort]] = {order: "desc"} if sort_hash[:sort]=='price'
        sort_query['_score'] = {order: "desc"} if sort_hash[:sort]=='relevence'
      end

      must << {
          range: {
              price: {
                  gte: search_hash_range[:minprice].to_i*100,
                  lte: search_hash_range[:maxprice].to_i*100
              }
          }
      }

      products = (Product.search query: {
          bool: {
              must: must,
              must_not: must_not
          }
      },
      sort: sort_query)
    end
    products.page(search[:page]).per(24).records.to_a


  end

  def self.build_search field,value
    ha=Hash.new

    if field=='title'
      ha[field] = {query: value, operator: "and", fuzziness: "AUTO"}
    else
      ha[field] = {query: value, operator: "and"}
    end
    {match: ha}


  end



end
