(function ($) {

    /*
     *  Constants
     * */
    var API_HOST = 'http://localhost:9000';
    var API_URL_BASE = API_HOST + "/api/pet";
    var API_URL_SYNC = API_URL_BASE + '/sync';
    var API_GET_PETS = API_URL_BASE;
    var API_GET_BREEDS = API_URL_BASE + "/breed";
    var API_GET_AGE = API_URL_BASE + "/age";

    var PET_KEYS = ["name", "breed", "age", "image", "url"];


    /*
     *  Dom related functions
     * */
    function updateTable(data) {
        if (!Array.isArray(data)) data = [data];
        var content = data.map(function (pet) {
            var row = PET_KEYS.map(function (key) {
                return '<th>' + pet[key] + '</th>>';
            }).join("");
            return '<tr>' + row + '</tr>';
        }).join("");
        $('table tbody').empty().append(content);
    }

    function updateSelect($select) {
        return function (options) {
            var content = options.map(function (opt) {
                return '<option>' + opt + '</option>';
            });
            content = '<option selected> All </option>' + content;
            $select.empty().append(content);
        }
    }

    function setMessage(msg) {
        if (msg) {
            $('.message').append('<p>' + msg + '</p>');
        } else {
            $('.message').empty();
        }
    }

    /*
     *   Ajax logic
     * */
    function syncPets() {
        return $.post(API_URL_SYNC);
    }

    function getAllPets() {
        return $.getJSON(API_GET_PETS);
    }

    function getAllAge() {
        return $.getJSON(API_GET_AGE);
    }

    function getPetsByAge(age) {
        return $.getJSON(API_GET_AGE + '/' + age);
    }

    function getAllBreed() {
        return $.getJSON(API_GET_BREEDS);
    }

    function getPetsByBreed(breed) {
        return $.getJSON(API_GET_BREEDS + '/' + breed);
    }

    /*
     *  Event logic
     * */
    $(function () {
        $('.sync button').click(function () {
            syncPets().then(updateTable);
        });

        getAllAge().then(updateSelect($('#age')));

        getAllBreed().then(updateSelect($('#breed')));

        $('#breed').change(function (e) {
            var select = $(this).val();
            if (select !== 'All') {
                getPetsByBreed(select).then(updateTable);
                $('#age').val('All');
            }
        });

        $('#age').change(function (e) {
            var select = $(this).val();
            if (select !== 'All') {
                getPetsByAge(select).then(updateTable);
                $('#breed').val('All');
            }
        });

    });

})($);
