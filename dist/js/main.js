$(document).ready(function () {
  let currentGalImage = $(".gal-item");
  currentGalImage.click(function () {
    const imageSrc = $(this).attr("src");

    $(".gal-main").attr("src", imageSrc);
  });
});

const a = "fdfdfd.jpg";
const b = "25";
console.log("<img " + `src="${a}" width="${b}%"` + ">");
