/*global bookStore */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the bookStoreStorage service
 * - exposes the model to the template and provides event handlers
 */
bookStore.controller('BookStoreCtrl', function TodoCtrl($scope, $location, bookStoreStorage, filterFilter) {
	var books = $scope.books = bookStoreStorage.get();

    if (!(books && books.length)) {
        books = bookList;
        bookStoreStorage.put(books);
    }
    $scope.books.forEach(function(data){
        var book = data,
            discount = 0;
        if (book.category == 'cookbook') {
            discount += book.price < 16 ? 1.5 : 3;
        } else if (book.category == 'computers') {
            discount += book.quantity < 30 ? 0.5 : 1;
        } else if (book.category == 'science') {
            discount += 0.5;
        }
        if (book.quantity > 50) {
            discount += 2;
        } else if (book.quantity > 100)  {
            discount += 5;
        }
        data.discount = discount;
        data.oldPrice = data.price;
        data.price = (data.price * (1 - discount / 100)).toFixed(2, 10);
    });


    $scope.newbook = bookStoreStorage.getEmptyBook();


    $scope.addBook = function(){
        var book = $scope.newbook;
        if (!book.isEdit){
            books.push({
                title: book.title,
                description: book.description,
                author: book.author,
                category: book.category,
                quantity: book.quantity,
                price: book.price
            });

        }
        bookStoreStorage.put(books);
        $scope.newbook = bookStoreStorage.getEmptyBook();
    }

    $scope.removeBook = function(book){
        books.splice(books.indexOf(book), 1);
        bookStoreStorage.put(books);
    }

    $scope.editBook = function(book, $el){
        console.log($el);
        $scope.newbook = book;
        $scope.newbook.isEdit = true;
        window.scrollTo(0, 0);
    };

});
