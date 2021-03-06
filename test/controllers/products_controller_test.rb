require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @product = products(:one)
  end

  test "should get index" do
    get products_url
    assert_response :success
  end

  test "should get new" do
    get new_product_url
    assert_response :success
  end

  test "should create product" do
    assert_difference('Product.count') do
      post products_url, params: { product: { category_name: @product.category_name, country_origin: @product.country_origin, formatted_msrp: @product.formatted_msrp, formatted_price: @product.formatted_price, id: @product.id, image_cover_url: @product.image_cover_url, premium: @product.premium, price: @product.price, shipping_exclusions: @product.shipping_exclusions, supplier_name: @product.supplier_name, title: @product.title } }
    end

    assert_redirected_to product_url(Product.last)
  end

  test "should show product" do
    get product_url(@product)
    assert_response :success
  end

  test "should get edit" do
    get edit_product_url(@product)
    assert_response :success
  end

  test "should update product" do
    patch product_url(@product), params: { product: { category_name: @product.category_name, country_origin: @product.country_origin, formatted_msrp: @product.formatted_msrp, formatted_price: @product.formatted_price, id: @product.id, image_cover_url: @product.image_cover_url, premium: @product.premium, price: @product.price, shipping_exclusions: @product.shipping_exclusions, supplier_name: @product.supplier_name, title: @product.title } }
    assert_redirected_to product_url(@product)
  end

  test "should destroy product" do
    assert_difference('Product.count', -1) do
      delete product_url(@product)
    end

    assert_redirected_to products_url
  end
end
