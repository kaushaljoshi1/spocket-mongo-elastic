require 'elasticsearch/model'
Elasticsearch::Model.client = Elasticsearch::Client.new host: 'localhost:9200', log: true

unless Product.__elasticsearch__.index_exists?
  Product.__elasticsearch__.create_index! force: true
  Product.import
end