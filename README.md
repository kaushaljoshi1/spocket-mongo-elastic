# README

Sample Product catalog search built on Rails with React as frontend, Mongo as persistent database 
and ElasticSearch for Indexing and Searching 

* Rails version - 6.0.3

* Ruby version - 2.6.3

* Mongo DB

* Elastic Search

# External dependencies
    
    Elastic Search instance running in default localhost:9200 port
    You may refer - https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-elasticsearch-on-ubuntu-18-04

    Mongo Db Instance on default localhost:27017
    
# Gems Dependency

    Elasticsearch-rails, Elasticsearch-model for ES-Rails integration    
    Mongoid for Mongodb integration
    React-rails for react components
    Kaminari for pagination



# Database creation

    Create a mongo database -> spocket_mongo_elastic_development(Rails will do it for you)

# Database initialization

    Download products.json from https://s3.amazonaws.com/spocket.assets/products.json
    mongoimport --db spocket_mongo_elastic_development --collection collectionName --file products.json --jsonArray
    OR
    Change mongoid.yml to use own database
    
# ElasticSearch initialization    
    Install elasticsearch(7.13 prefered) and start server in port 9200 using sudo systemctl start elasticsearch

# To Start
    * Setup Mongo - Mentioned Above
    * Setup Elastic search - Mentioned Above
    * Database creation - Mentioned Above
    * Database initialization - Mentioned Above
    
    
    Clone project from github - 
    cd spocket-mongo-elastic
    rails s 
    In browser localhost:3000
    
# How It all works
    On initializing rails server it will check for the products index in elastic search. 
    If index is not create it will create index in elastic server by using index configuration in app/model/product.rb
    The code is written in initializer/elasticsearch.rb
    
    Whenever any product is added, updated or deleted it will automatically update indexes in Elastic server
    by using callback method defined in product.rb. This is done using elasticsearch-rails and elasticsearch-model gems
    
    You can see search in action at localhost:3000 once you have configured the project in local.
    
# Mentionable Features
    Blazing fast search using ES and Mongo 
    Fuzzy search on keyword - Die will fetch results for Dye
    
    
# Improvements

    Better UI
    Test Cases
    Lazy Loading instead of pagination
    Shareable URl like - localhost:3000?category=xyz 
    
    
    
        
    



