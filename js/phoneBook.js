window.phoneBook = {

    API_URL: "http://localhost:8082/phoneBookItems",

    getContacts: function () {
        $.ajax({
            url: phoneBook.API_URL,
            method: "GET"
        }).done(function (response) {
            console.log("GET done");
            console.log(response);

            phoneBook.displayContacts(JSON.parse(response));
        });
    },

    createContact: function () {
        let firstNameValue = $("#firstN").val();
        let lastNameValue = $("#lastN").val();
        let phoneNumberValue = $("#phoneN").val();
        let countryValue = $("#countryN").val();
        let cityValue = $("#cityN").val();
        let emailValue = $("#emailA").val();

        var requestBody = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phoneNumber: phoneNumberValue,
            country: countryValue,
            city: cityValue,
            email: emailValue,
        };

        $.ajax({
            url: phoneBook.API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            phoneBook.getContacts();
        })
    },

    updateContact: function (firstNameVal, lastNameVal, phoneNrVal, countryVal, cityVal, emailVal, id) {
        let firstNameValue = $("#firstN").val();
        let lastNameValue = $("#lastN").val();
        let phoneNumberValue = $("#phoneN").val();
        let countryValue = $("#countryN").val();
        let cityValue = $("#cityN").val();
        let emailValue = $("#emailA").val();

        let requestBody = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            phoneNumber: phoneNumberValue,
            country: countryValue,
            city: cityValue,
            email: emailValue,
        };

        $.ajax({
            url: phoneBook.API_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            phoneBook.getContacts();
        })
    },

    deleteContact: function (id) {
        $.ajax({
            url: phoneBook.API_URL + "?id=" + id,
            method: "DELETE",
        }).done(function () {
            phoneBook.getContacts();
        })
    },

    displayContacts: function (items) {
        var tableContent = "";
        items.forEach(item => tableContent += phoneBook.getContactTableRow(item));
        $("#phoneBookItem tbody").html(tableContent);
    },

    getContactTableRow: function (item) {
        return `<tr>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>+${item.phoneNumber}</td>
                <td>${item.country}</td>
                <td>${item.city}</td>
                <td>${item.email}</td>
                <td> <button type="reset" data-id="${item.id}" class="delete-contact">Delete</button>
                <button type="reset" data-id="${item.id}" class="update-contact">Update</button></td>
                </tr>`
    },

    bindEvents: function () {

        $("#create-item").submit(function (event) {
            event.preventDefault();
            phoneBook.createContact();
        });

        $("#phoneBookItem").delegate(".delete-contact", "click", function (event) {
            event.preventDefault();
            let id = $(this).data("id");
            phoneBook.deleteContact(id);
        });

        document.getElementById('search').addEventListener('input', function() {
            const value = this.value;
            phoneBook.search(value);
        });
    },

    search: function (value) {
        value = value.toLowerCase();

        var filtered = items.filter(function (person) {
            return person.firstName.toLowerCase().includes(value) ||
                person.lastName.toLowerCase().includes(value) ||
                person.phoneNumber.toLowerCase().includes(value);
        });
        phoneBook.display(filtered);
    }
};
phoneBook.getContacts();
phoneBook.bindEvents();
phoneBook.search();