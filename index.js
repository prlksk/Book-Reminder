'use strict';
var config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
}; // Api Ayarı

var Library = angular.module("Library", ['ngRoute', 'ngSanitize', 'ngAnimate']); // Uygulamamızı angular modülü olarak alıyoruz

Library.config(['$routeProvider', '$locationProvider', function($routeProvider) { // Angular yönlendirmesi
    $routeProvider.when('/connect', {templateUrl: 'page/connect/index.html'})
    .when('/connect/register', {templateUrl: 'page/connect/register.html'})
    .when('/check', {templateUrl: 'page/empty/check.html'})
    .when('/logout', {templateUrl: 'page/empty/logout.html'})
    .when('/main', {templateUrl: 'page/main/index.html'})
    .when('/add', {templateUrl: 'page/main/add.html'})
    .when('/borrow', {templateUrl: 'page/main/borrow.html'})
    .when('/search', {templateUrl: 'page/main/search.html'})
    .when('/user', {templateUrl: 'page/main/user.html'})
    .otherwise({redirectTo: '/check'});
}]);

Library.directive("headBar", function() { // Angular directivesi ile header 
  return {
    templateUrl : "tools/headBar.html"
  };
});

Library.controller("LibraryController", ['$scope', '$http', '$location', function($scope, $http, $location) { // Projemizde geçerli tek controller
    function localStorageCheck(temporary) { // LocalStorage Veri Tipi Kontrolü
        if (temporary == null || !(Array.isArray(temporary))) return false;
        else return true
    }
    function safety($scope, fn) { // Güvenli değişken içeriği değişimi
        var phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && typeof fn === 'function') {
                fn()
            }
        } else {
            $scope.$apply(fn)
        }
    }
    function toast(text){ // Toast metin
        M.toast({html: text, displayLength: 2000});
    }
    function api(url, data, finalFunc = null) { // Api istek fonksiyonu
        try {
            var byeData = $.param({
                data: data
            });
            $http.post(url, byeData, config).then(function(response) {
                if (finalFunc != null) finalFunc(response.data, data)
            })
        } catch (err) {
            alert(err.message)
        }
    }    

    function checkText(text){ // Metin kontrolü
        var letters = /^[0-9a-zA-Z]+$/;
        if(text.match(letters)) return false;
        else return true;
    }

    $scope.login = function() {
        var username = $("#username").val();
        var password = $("#password").val();

        if(checkText(username)) toast("username can be include only letter and number");
        else if(checkText(password)) toast("password can be include only letter and number");
        else if(username.length < 3) toast("username cannot be less than 3 characters");
        else if(password.length < 3) toast("password cannot be less than 3 characters");
        else if(username.length > 30) toast("username cannot exceed 30 characters");
        else if(password.length > 30) toast("password cannot exceed 30 characters");
        else api('api/login.php', [username, password], loginFunc)
    }
    function loginFunc(answer, data) {
        if (answer == "false") toast("an error occurred") // Hata
        else if (answer == "wrong") toast("Wrong username or password") // Yanlış
        else if (answer[0] == "true") {
            localStorage.setItem("libraryConn", JSON.stringify([data[0], answer[1]]));            
            setTimeout(function() {
                window.location = "#!/main";
            }, 100);
        }
    }

    $scope.register = function() {
        var email = $("#email").val();
        var username = $("#username").val();
        var password = $("#password").val();

        if(checkText(username)) toast("username can be include only letter and number");
        else if(checkText(password)) toast("password can be include only letter and number");
        else if(username.length < 3) toast("username cannot be less than 3 characters");
        else if(password.length < 3) toast("password cannot be less than 3 characters");
        else if(email.length < 5) toast("email cannot be less than 5 characters");
        else if(username.length > 30) toast("username cannot exceed 30 characters");
        else if(password.length > 30) toast("password cannot exceed 30 characters");
        else api('api/register.php', [username, password, email], registerFunc)
    }
    function registerFunc(answer, data) {
        if (answer == "false") toast("An error occurred"); // Hata
        else if (answer == "same") toast("Username or mail address using"); // Kullanımda
        else if (answer[0] == "true") {
            localStorage.setItem("libraryConn", JSON.stringify([data[0], answer[1]]));
            setTimeout(function() { 
                window.location = "#!/main";
            }, 100);
        }
    }

    $scope.userSearch = function() { // Kullanıcı araması
        var username = $("#usersearch").val();

        if(checkText(username)) toast("username can be include only letter and number");
        else if(username.length < 3) toast("username can't be less than 3 characters");
        else api('api/userSearch.php', username, userSearchFunc)
    }
    function userSearchFunc(answer, data){ // Kullanıcı listesi çekimi sonuç aktarımı
        $scope.userSearchResults = answer;
    }
    $scope.visitProfile = function(x) { // Kullanıcı profili ziyareti
        $scope.activeUser = x;
        window.location = "#!/user";
    }   
    function userGet(answer, data){ // Kullanıcı geçmişi
        $scope.activeUser.history = answer;
    }

    $scope.bookSearch = function() { // Kitap araması
        var bookname = $("#booknamesearch").val();
        if(bookname.length < 3) toast("book name can't be less than 3 characters");
        else api('api/bookSearch.php', bookname, bookSearchFunc)
    }
    function bookSearchFunc(answer, data){
        $scope.bookSearchResults = answer; // Sonuç aktarımı
    }
    $scope.selectBook = function(x){ // Listeden kitap seçimi
        x.select = true;
        $scope.selectedBook = x;
    }

    $scope.returnBook = function() { // Kitap iadesi
        var data = [
            $scope.me.history[0].bookname, 
            $scope.me.history[0].bookwriter, 
            $scope.me.username, 
            $scope.me.mail];
        api('api/bookReturn.php', data, returnBookFunc)
    }
    function returnBookFunc(answer, data){ // Kitap iadesi sonucu
        if(answer == "true") location.reload();
        else toast("An error accoured");
    }

    $scope.addBook = function() { // Kitap eklemek
        var bookid = $("#bookid").val();
        var bookname = $("#bookname").val();
        var bookwriter = $("#bookwriter").val();

        if(bookid.length < 3) toast("Book id can't be less than 3 characters");
        else if(bookname.length < 3) toast("Book name can't be less than 3 characters");
        else if(bookwriter.length < 3) toast("Book writer can't be less than 3 characters");
        else api('api/addBook.php', [bookid, bookname, bookwriter], addBookFunc)
    }
    function addBookFunc(answer, data){ // Kitap ekleme sonucu
        if(answer == "book") toast("Book id is already using");
        else if(answer == "true") window.location = "#!/borrow";
        else toast("An error accoured");

        $("#bookid").val("");
        $("#bookname").val("");
        $("#bookwriter").val("");
    }

    $scope.borrowBook = function() {
        var startTime = $("#startTime").val(); // Kullanıcının seçtiği tarih alınıyor
        var time = new Date(startTime); // Javascript tarih bazına çeviriliyor
        var timeMillisecond = time.getTime(); // Ve milisaniye bazında tekrar alınıyor
        var data = [
            $scope.selectedBook.bookid, 
            $scope.selectedBook.bookname, 
            $scope.selectedBook.bookwriter, 
            $scope.me.username, 
            timeMillisecond, 
            $scope.me.mail];
        api('api/borrowBook.php', data, borrowBookFunc)
    }
    function borrowBookFunc(answer, data){ // Kitap alma işlemi sonucu
        if(answer == "true") $location.url("/main"); // Başarılıysa ana sayfaya yönlendirme var
        else toast("An error accoured"); // Değilse hata metni
    }

    function logout(url = "/connect") { // Çıkış işleminde veriler temizleniyor
        safety($scope, function() {
            $scope.me = undefined;
        });
        localStorage.removeItem("libraryConn");
        clear();
        $location.url(url)
    }

    function check(value = true) {
        var data = JSON.parse(localStorage.getItem("libraryConn")); // Önceden açık oturum bilgisi çekiliyor
        if (localStorageCheck(data)){ // Veri türü kontrol ediliyor
            data.push(value); // URL bilgisi ekleniyor
            api('api/check.php', data, checkFunc) // Veri tabanında kontrol ediliyor
        }else if(value != "/connect" && value != "/connect/register") $location.url("/connect");
    }
    function checkFunc(answer, data) {
        if (answer == "false") {
            localStorage.removeItem("libraryConn"); // Yanlış veri siliniyor ve yönlendirme yapılıyor
            if(data[2] != "/connect" && data[2] != "/connect/register") $location.url("/connect"); // Yönlendirme
        } else { // Doğru veriye göre işlem yapılyor
            safety($scope, function() {
                $scope.me = answer;
            });
            if(data[2] == "/main") api('api/history.php', $scope.me.mail, meHistory);
            else if(data[2] == "/search" || data[2] == "/add" || data[2] == "/borrow") clear();
            else if(data[2] == "/user" && $scope.activeUser != undefined) api('api/user.php', $scope.activeUser.mail, userGet);
            else $location.url("/main");
        }
    }

    function clear(){
        $scope.bookSearchResults = undefined;
        $scope.userSearchResults = undefined;
    }

    function meHistory(answer, data){
        if(answer.length != 0){
            if(answer[0].active == 1){
                var dayMillisecond = 1000*60*60*24; // 24 saat, milisaniye bazında
                var date = new Date(); // Tarih
                var dateNow = date.getTime(); // Şu an ki tarih
                var dateDifference = dateNow - answer[0].time; // Tarihler arası fark
                var differenceDay = dateDifference / dayMillisecond; // Fark, gün bazında 
                var dayRemaining = 20 - Math.ceil(differenceDay); // Teslime kalan gün
                answer[0].deadline = dayRemaining;
            }
        }
        $scope.me.history = answer;
    }

    $scope.$watch(function() {
        return $location.path()
    }, function(value) {
        if (value != "" && value != "/") {
            if (location.protocol != 'https:') {
                window.location = 'https://schoollibrarybook.com' + value; // SSL sertifikası düzeltmesi
            }else if (value == "/logout") logout() // URL logout'a eşitse logout fonksiyonunu çalıştırır
            else check(value); // URL logout'a eşit değilse kontrole gönderir
            $(window).scrollTop(0) // Sayfa değişimlerinde 
        }
    });

    $scope.enter = function(event) { // Sayfalardaki enter tuşu eventi için yazılmış fonksiyon
        if (event.keyCode == 13) {
            var loc = $location.url();
            if (loc == "/connect") $scope.login();
            else if (loc == "/connect/register") $scope.register();
            else if (loc == "/borrow") $scope.bookSearch();
            else if (loc == "/search") $scope.userSearch();
            else if (loc == "/add") $scope.addBook();
        }
    };
}]);