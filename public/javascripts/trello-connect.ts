declare var $, Trello;

function updateStatus(): void {
    var isLoggedIn = Trello.authorized();
    $("#loggedOut").toggle(!isLoggedIn);
    $("#loggedIn").toggle(isLoggedIn);
}

function onAuthorize(): void {
    updateStatus();

    $("#output").empty();

    Trello.members.get("me", function (member) {
        $("#fullName").text(" " + member.fullName);

        var $boards = $("<div>")
            .text("Loading Boards...")
            .appendTo("#output");

        // Get the boards
        Trello.get("members/my/boards", function (boards) {
            $boards.empty();
            $.each(boards, function (ix, board) {

                console.log(board);

                var $p = $("<p>").appendTo($boards);

                $("<a>")
                    .attr({ href: board.url, target: "trello" })
                    .addClass("board")
                    .text(board.name)
                    .appendTo($p);
            });
        });
    });
}

// TODO: Replace jQuery with KnockoutJS
$(function () {
    Trello.authorize({
        interactive: false,
        expiration: "never",
        success: onAuthorize
    });

    $("#logIn").click(function (e) {    // ewww... knows too much about view... TODO: kill it
        e.preventDefault();

        Trello.authorize({
            type: "popup",
            expiration: "never",
            success: onAuthorize
        });
    });

    $("#logOut").click(function (e) {
        e.preventDefault();

        Trello.deauthorize();
        updateStatus();
    });

    updateStatus();
});