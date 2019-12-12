window.phoneBook = {

    API_URL: "http://localhost:8082/phoneBookItems",

    getItems: function () {
        $.ajax({
            url: phoneBook.API_URL,
            method: "GET"
        }).done(function (response) {
            console.log("GET done");
            console.log(response);
        });
    }
};
phoneBook.getItems();