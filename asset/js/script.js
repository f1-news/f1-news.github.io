document.addEventListener("DOMContentLoaded", async function () {
  // 图片数据数组，包含图片路径、标题和类别
  const imageData = await loadNews();
  //每页显示的件数
  const itemsPerPage = 18;
  // 移动端当前页面
  let currentPage = 1;

  function displayImages(currentPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    currentImages = imageData.slice(startIndex, endIndex);
    const gallery = document.querySelector(".news");
    currentImages.forEach((el) => {
      //article
      const article = document.createElement("article");
      article.classList.add("card");
      // create loading
      const loadingElement = document.createElement("div");
      loadingElement.classList.add("image-loading");
      loadingElement.textContent = "Loading...";
      loadingElement.style.display = "block";
      //img
      const img = new Image();
      img.onload = function () {
        // hide loading
        loadingElement.style.display = "none";
      };
      img.onerror = function () {
        // hide loading
        loadingElement.style.display = "none";
      };
      img.alt = el.title;
      img.title = el.title;
      img.src = el.cover;
      //ceate link
      const alink = document.createElement("a");
      alink.href = el.url;
      alink.target = "_blank";
      alink.rel = "noopener noreferrer nofollow";
      const titleContainer = document.createElement("div");
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.textContent = el.tag;
      const h2 = document.createElement("h2");
      titleContainer.appendChild(h2);
      h2.textContent = el.title;
      titleContainer.appendChild(tag);
      titleContainer.appendChild(h2);
      alink.appendChild(img);
      alink.appendChild(titleContainer);
      article.appendChild(alink);
      article.appendChild(loadingElement);
      gallery.appendChild(article);
    });
  }

  // load more
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.addEventListener("click", function () {
    currentPage++;
    displayImages(currentPage);
    if (itemsPerPage > currentImages.length) {
      loadMoreBtn.style.display = "none";
    }
  });

  // to top btn
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // to top
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // init
  displayImages(1);
});

// load img
function loadImage(src, callback) {
  const img = new Image();
  img.onload = function () {
    callback(img);
  };
  img.onerror = function () {
    callback(img);
  };
  img.src = src;
}
/**
 * loading news
 */
async function loadNews() {
  try {
    const response = await fetch(`raw/datas_zh.json`);
    const datas = await response.json();
    if (!datas) {
      datas = [];
    }
    //loading hide
    document.querySelector(".loader-wrapper").style.display = "none";
    return datas;
  } catch (e) {
    console.log(e);
  }
}
