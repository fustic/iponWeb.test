/*global bookStore */
'use strict';

/**
 * Services that persists and retrieves books from localStorage
*/
bookStore.factory('bookStoreStorage', function () {
	var STORAGE_ID = 'book-store-cms';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (books) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(books));
		},
        getEmptyBook: function(){
            return {
                category: "literature",
                title: "",
                description: "",
                price: "0",
                quantity: 0,
                author: null,
                isEdit: false
            }
        }
	};
});
