require "application_system_test_case"

class ProductsTest < ApplicationSystemTestCase
  setup do
    @product = products(:one)
  end

  test "visiting the index" do
    visit products_url
    assert_selector "h1", text: "Products"
  end

  test "creating a Product" do
    visit products_url
    click_on "New Product"

    fill_in "Category name", with: @product.category_name
    fill_in "Country origin", with: @product.country_origin
    fill_in "Formatted msrp", with: @product.formatted_msrp
    fill_in "Formatted price", with: @product.formatted_price
    fill_in "Id", with: @product.id
    fill_in "Image cover url", with: @product.image_cover_url
    check "Premium" if @product.premium
    fill_in "Price", with: @product.price
    fill_in "Shipping exclusions", with: @product.shipping_exclusions
    fill_in "Supplier name", with: @product.supplier_name
    fill_in "Title", with: @product.title
    click_on "Create Product"

    assert_text "Product was successfully created"
    click_on "Back"
  end

  test "updating a Product" do
    visit products_url
    click_on "Edit", match: :first

    fill_in "Category name", with: @product.category_name
    fill_in "Country origin", with: @product.country_origin
    fill_in "Formatted msrp", with: @product.formatted_msrp
    fill_in "Formatted price", with: @product.formatted_price
    fill_in "Id", with: @product.id
    fill_in "Image cover url", with: @product.image_cover_url
    check "Premium" if @product.premium
    fill_in "Price", with: @product.price
    fill_in "Shipping exclusions", with: @product.shipping_exclusions
    fill_in "Supplier name", with: @product.supplier_name
    fill_in "Title", with: @product.title
    click_on "Update Product"

    assert_text "Product was successfully updated"
    click_on "Back"
  end

  test "destroying a Product" do
    visit products_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Product was successfully destroyed"
  end
end
