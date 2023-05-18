/** delay autohide block html */
const autohideBlock = () => {
  $('.autohide').each(function () {
    const that = $(this);
    let delay = that.data('delay');
    if (!delay) {
      delay = 5000;
    }
    setTimeout(function () {
      that.remove();
    }, delay);
  });
};

/**
 * set menu active, open
 */
const menuActive = () => {
  if (typeof jsonMenu !== 'object' || !Array.isArray(jsonMenu) || jsonMenu.length === 0) {
    return true;
  }
  jsonMenu.forEach(item => {
    $(`[data-menu-open="${item}"]`).addClass('menu-open');
    $(`[data-menu="${item}"]`).addClass('active');
  })
}

/**
 * delete object null value
 */
const removeNullObj = (sjonObj) => {
  $.each(sjonObj, function (key, value) {
    if (!value) {
      delete sjonObj[key];
    }
  });
}

/**
 * paginator nav
 */
const paginatePager = (urlParams) => {
  if (!urlParams) {
    urlParams = new URLSearchParams(window.location.search);
  }
  const result = {
    base: window.location.origin + window.location.pathname,
    hash: window.location.hash,
    query: '?page={{page}}',
  }
  if (urlParams.size > 0) {
    urlParams.delete('page');
    result.query = '?' + urlParams.toString() + '&page={{page}}';
  }
  return result.base + result.query + result.hash;
}
const paginate = () => {
  const that = $('#paginationnav');
  if (that.length === 0) {
    return;
  }
  const totalCount = that.data('page-total');
  if (totalCount == 0) {
    return;
  }
  const options = {
    limit: 50,
    currentPage: 1,
    totalCounts: 0,
  }
  let urlParams = new URLSearchParams(window.location.search);
  let valuePaginator = {
    totalCounts: that.data('page-total'),
    limit: that.data('page-size'),
    currentPage: urlParams.get('page') ? parseInt(urlParams.get('page')) : null,
  };
  removeNullObj(valuePaginator);
  valuePaginator = Object.assign(options, valuePaginator);
  const objPagerNumber = paginatePager();
  $.jqPaginator(`#${that.attr('id')}`, {
    totalCounts: valuePaginator.totalCounts,
    pageSize: valuePaginator.limit,
    currentPage: valuePaginator.currentPage,
    visiblePages: 5,
    first:
      '<li class="page-item">' +
      `<a class="page-link" href="${objPagerNumber}" aria-label="Previous">` +
      '<span aria-hidden="true"><i class="fa-solid fa-angles-left"></i></span>' +
      '<span class="sr-only">Previous</span>' +
      '</a>' +
      '</li>',
    last:
      '<li class="page-item">' +
      `<a class="page-link" href="${objPagerNumber}" aria-label="Previous">` +
      '<span aria-hidden="true"><i class="fa-solid fa-angles-right"></i></span>' +
      '<span class="sr-only">Previous</span>' +
      '</a>' +
      '</li>',
    prev:
      '<li class="page-item">' +
      `<a class="page-link" href="${objPagerNumber}" aria-label="Previous">` +
      '<span aria-hidden="true"><i class="fa-solid fa-angle-left"></i></span>' +
      '<span class="sr-only">Previous</span>' +
      '</a>' +
      '</li>',
    next:
      '<li class="page-item">' +
      `<a class="page-link" href="${objPagerNumber}" aria-label="Next">` +
      '<span aria-hidden="true"><i class="fa-solid fa-angle-right"></i></span>' +
      '<span class="sr-only">Next</span>' +
      '</a>' +
      '</li>',
    page: `<li class="page-item"><a class="page-link" href="${objPagerNumber}">{{page}}</a></li>`
  });
};
/**
 * list page - search input
 */
const listSearch = () => {
  const domInputs = $('.input-list-search');
  if (domInputs.length === 0) {
    return;
  }
  let urlParams = new URLSearchParams(window.location.search);

  const submitFormSearch = () => {
    const formVal = {};
    if (urlParams.size > 0) {
      urlParams.delete('page');
    }
    urlParams.forEach(function (value, key) {
      formVal[key] = value;
    });
    domInputs.each(function () {
      const domInput = $(this);
      formVal[domInput.attr('name')] = domInput.val();
    });
    const url = window.location.origin + window.location.pathname + '?' + $.param(formVal) + window.location.hash;
    window.location.href = url;
  };


  // init value input search text
  domInputs.each(function () {
    const domInput = $(this);
    const nameInput = domInput.attr('name');
    if (urlParams.has(nameInput)) {
      domInput.val(urlParams.get(nameInput));
    }
  });

  domInputs.on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      submitFormSearch();
    }
  });
  $('.btn-list-search').click(function () {
    submitFormSearch();
  });
  $('.btn-list-search-reset').click(function () {
    domInputs.each(function () {
      $(this).val('');
      submitFormSearch();
    });
  });
}

/**
 * form validate, form disable submit
 */
const formsValidate = () => {
  $(".form-validate:not(.fv-cc)").validate();
  if (typeof validateRuler === 'function') {
    $('.form-validate.fv-cc').validate({
      rules: validateRuler(),
    });
  }
}
const formDisabled = () => {
  $('form button[type="submit"]').prop('disabled', false);
  $('form.form-validate').on('submit', function () {
    var that = $(this);
    setTimeout(function () {
      if (typeof that.valid !== 'function' || that.valid()) {
        that.find('button[type="submit"]').prop('disabled', true);
        if (that.data('btn-disable')) {
          $(`.${that.data('btn-disable')}`).prop('disabled', true);
        }
      }
    }, 10);
  });
}
const formDelelteConfirm = () => {
  $('.form-del').submit(function (event) {
    var that = $(this);
    if (confirm('Are you sure DELETE?')) {
      if (that.data('btn-disable')) {
        $(`.${that.data('btn-disable')}`).prop('disabled', true);
      }
      return true;
    }
    event.preventDefault();
  })
}

const datetimePicker = () => {
  $('.datepicker').datetimepicker({
    format: 'yyyy-MM-DD',
    icons: {
      previous: "fa-solid fa-caret-left",
      next: "fa-solid fa-caret-right",
    },
  });
  $('.datetimepicker').datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss',
    // inline: true,
    sideBySide: true,
    icons: {
      previous: "fa-solid fa-caret-left",
      next: "fa-solid fa-caret-right",
      up: 'fa-solid fa-caret-up text-light',
      down: 'fa-solid fa-caret-down text-light',
    },
  });
}

/**
 * try catch function, if error => run continue
 */
const trycatchcb = (cb) => {
  try {
    cb();
  } catch (err) {
    console.error(err);
  }
}

jQuery(function ($) {
  trycatchcb(autohideBlock);
  trycatchcb(menuActive);
  trycatchcb(paginate);
  trycatchcb(listSearch);
  trycatchcb(formsValidate);
  trycatchcb(formDisabled);
  trycatchcb(formDelelteConfirm);
  trycatchcb(datetimePicker);
});