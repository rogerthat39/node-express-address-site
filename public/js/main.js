$(document).ready(() => {
    $("#house-modal").on("show.bs.modal", function(event) {
        var button = $(event.relatedTarget)
        var description = button.data("description")
        var image = button.data("image")
        var modal = $(this)

        modal.find(".modal-header > img").attr("src", "/images/houses/" + image)
        modal.find(".modal-body").text(description)
    })
})