(function () {
    'use strict';
    var App = angular.module('app');

    //app modules
    App.directive('insDashboard', insDashboard);
    App.directive('insHeader', insHeader);
    App.directive('insFooter', insFooter);
    // App.directive('insFeeCollection',insFeeCollection);

    insDashboard.$inject = ['$rootScope', '$compile'];
    function insDashboard($rootScope, $compile) {
        return {
            restrict: 'EA',
            templateUrl: 'app/modules/dashboard/dashboard.html',
            controller: 'DashboardController',
            replace: true
        };
    }

    insHeader.$inject = ['$rootScope', '$compile'];
    function insHeader($rootScope, $compile) {
        return {
            restrict: 'EA',
            templateUrl: 'app/modules/header/base_header.html',
            controller: 'HeaderController',
            replace: true
        };
    }

    insFooter.$inject = ['$rootScope', '$compile'];
    function insFooter($rootScope, $compile) {
        return {
            restrict: 'EA',
            templateUrl: 'app/modules/footer/base_footer.html',
            replace: true
        };
    }

    // insFeeCollection.$inject = ['$rootScope', '$compile'];
    // function insFeeCollection($rootScope, $compile) {
    //     return {
    //         restrict: 'EA',
    //         templateUrl: 'app/modules/feeCollection/fee.html',
    //         controller: 'feeCollectionCtrl',
    //         replace: true,
    //     };
    // }


    
    /*
     * Custom helper directives
     *
     */

    // View loader functionality
    // By adding the attribute 'data-js-view-loader'
    App.directive('jsViewLoader', function () {
        return {
            link: function (scope, element) {
                var el = jQuery(element);

                // Hide the view loader, populate it with content and style it
                el
                    .hide()
                    .html('<i class="fa-fw fa fa-refresh fa-spin text-primary"></i>')
                    .css({
                        'position': 'fixed',
                        'top': '20px',
                        'left': '50%',
                        'height': '20px',
                        'width': '20px',
                        'margin-left': '-10px',
                        'z-index': 99999
                    });

                // On state change start event, show the element
                scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    el.fadeIn(250);
                });

                // On state change success event, hide the element
                scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    el.fadeOut(250);
                });
            }
        };
    });

    // Main navigation functionality
    // By adding the attribute 'data-js-main-nav'
    App.directive('jsMainNav', function () {
        return {
            link: function (scope, element) {
                // When a submenu link is clicked
                jQuery('[data-toggle="nav-submenu"]', element).on('click', function (e) {
                    // Get link
                    var link = jQuery(this);

                    // Get link's parent
                    var parentLi = link.parent('li');

                    if (parentLi.hasClass('open')) { // If submenu is open, close it..
                        parentLi.removeClass('open');
                    } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
                        link
                            .closest('ul')
                            .find('> li')
                            .removeClass('open');

                        parentLi
                            .addClass('open');
                    }

                    return false;
                });

                // Remove focus when clicking on a link
                jQuery('a', element).on('click', function () {
                    jQuery(this).blur();
                });

            }
        };
    });

    // Form helper functionality (placeholder support for IE9 which uses HTML5 Placeholder plugin + Material forms)
    // Auto applied to all form elements (<form>)
    App.directive('form', function () {
        return {
            restrict: 'E',
            link: function (scope, element) {
                // Init form placeholder (for IE9)
                jQuery('.form-control', element).placeholder();

                // Init material forms
                jQuery('.form-material.floating > .form-control', element).each(function () {
                    var input = jQuery(this);
                    var parent = input.parent('.form-material');

                    setTimeout(function () {
                        if (input.val()) {
                            parent.addClass('open');
                        }
                    }, 150);

                    input.on('change', function () {
                        if (input.val()) {
                            parent.addClass('open');
                        } else {
                            parent.removeClass('open');
                        }
                    });
                });
            }
        };
    });

    // Blocks options functionality
    // By adding the attribute 'data-js-block-option'
    App.directive('jsBlockOption', function () {
        return {
            link: function (scope, element) {
                var el = jQuery(element);

                // Init Icons
                scope.helpers.uiBlocks(false, 'init', el);

                // Call blocks API on click
                el.on('click', function () {
                    scope.helpers.uiBlocks(el.closest('.block'), el.data('action'));
                });
            }
        };
    });

    // Print page on click
    // By adding the attribute 'data-js-print'
    App.directive('jsPrint', function () {
        return {
            link: function (scope, element) {
                jQuery(element).on('click', function () {
                    // Store all #page-container classes
                    var lPage = jQuery('#page-container');
                    var pageCls = lPage.prop('class');

                    // Remove all classes from #page-container
                    lPage.prop('class', '');

                    // Print the page
                    window.print();

                    // Restore all #page-container classes
                    lPage.prop('class', pageCls);
                });
            }
        };
    });

    // Populate element's content with the correct copyright year
    // By adding the attribute 'data-js-year-copy'
    App.directive('jsYearCopy', function () {
        return {
            link: function (scope, element) {
                var gdate = new Date();
                var copyright = '2015';

                if (gdate.getFullYear() !== 2015) {
                    copyright = copyright + '-' + gdate.getFullYear().toString().substr(2, 2);
                }

                element.text(copyright);
            }
        };
    });

    // Animated scroll to an element
    // By adding the attribute (with custom values) 'data-js-scroll-to="{target: '#target_element_id', speed: 'milliseconds'}"' to a button or a link
    App.directive('jsScrollTo', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsScrollTo) !== 'undefined') ? scope.$eval(attrs.jsScrollTo) : new Object();
                var header = jQuery('#header-navbar');
                var headerHeight = (header.length && scope.webapp.settings.headerFixed) ? header.outerHeight() : 0;

                jQuery(element).on('click', function () {
                    jQuery('html, body').animate({
                        scrollTop: jQuery(options.target).offset().top - headerHeight
                    }, options.speed ? options.speed : 1000);
                });
            }
        };
    });

    // Toggle a class to a target element
    // By adding the attribute (with custom values) 'data-js-toggle-class="{target: '#target_element_id', class: 'class_name_to_toggle'}'
    App.directive('jsToggleClass', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsToggleClass) !== 'undefined') ? scope.$eval(attrs.jsToggleClass) : new Object();

                jQuery(element).on('click', function () {
                    jQuery(options.target).toggleClass(options.class);
                });
            }
        };
    });

    // Removes focus from an element on click
    // By adding the attribute 'data-js-blur'
    App.directive('jsBlur', function () {
        return {
            link: function (scope, element) {
                element.bind('click', function () {
                    element.blur();
                });
            }
        };
    });


    /*
     * Third party jQuery plugin inits or custom ui helpers packed in Angular directives for easy
     *
     */

    // Bootstrap Tabs (legacy init - if you like, you can use the native implementation from Angular UI Bootstrap)
    // By adding the attribute 'data-js-tabs' to a ul with Bootstrap tabs markup
    App.directive('jsTabs', function () {
        return {
            link: function (scope, element) {
                jQuery('a', element).on('click', function (e) {
                    e.preventDefault();
                    jQuery(this).tab('show');
                    jQuery(".select2-container").addClass("full-width");
                    jQuery(".custom-datepicker").datepicker({
                        weekStart: 1,
                        autoclose: true,
                        todayHighlight: true
                    });
                });
            }
        };
    });

    // Custom Table functionality: Section toggling
    // By adding the attribute 'data-js-table-sections' to your table
    App.directive('jsTableSections', function () {
        return {
            link: function (scope, element) {
                var table = jQuery(element);
                var tableRows = jQuery('.js-table-sections-header > tr', table);

                tableRows.on('click', function (e) {
                    var row = jQuery(this);
                    var tbody = row.parent('tbody');

                    if (!tbody.hasClass('open')) {
                        jQuery('tbody', table).removeClass('open');
                    }

                    tbody.toggleClass('open');
                });
            }
        };
    });

    // Custom Table functionality: Checkable rows
    // By adding the attribute 'data-js-table-checkable' to your table
    App.directive('jsTableCheckable', function () {
        return {
            link: function (scope, element) {
                var table = jQuery(element);

                // When a checkbox is clicked in thead
                jQuery('thead input:checkbox', table).click(function () {
                    var checkedStatus = jQuery(this).prop('checked');

                    // Check or uncheck all checkboxes in tbody
                    jQuery('tbody input:checkbox', table).each(function () {
                        var checkbox = jQuery(this);

                        checkbox.prop('checked', checkedStatus);
                        uiCheckRow(checkbox, checkedStatus);
                    });
                });

                // When a checkbox is clicked in tbody
                jQuery('tbody input:checkbox', table).click(function () {
                    var checkbox = jQuery(this);

                    uiCheckRow(checkbox, checkbox.prop('checked'));
                });

                // When a row is clicked in tbody
                jQuery('tbody > tr', table).click(function (e) {
                    if (e.target.type !== 'checkbox'
                        && e.target.type !== 'button'
                        && e.target.tagName.toLowerCase() !== 'a'
                        && !jQuery(e.target).parent('label').length) {
                        var checkbox = jQuery('input:checkbox', this);
                        var checkedStatus = checkbox.prop('checked');

                        checkbox.prop('checked', !checkedStatus);
                        uiCheckRow(checkbox, !checkedStatus);
                    }
                });

                // Checkable table functionality helper - Checks or unchecks table row
                var uiCheckRow = function (checkbox, checkedStatus) {
                    if (checkedStatus) {
                        checkbox
                            .closest('tr')
                            .addClass('active');
                    } else {
                        checkbox
                            .closest('tr')
                            .removeClass('active');
                    }
                };
            }
        };
    });

    // jQuery Appear, for more examples you can check out https://github.com/bas2k/jquery.appear
    // By adding the attribute (with custom values) 'data-js-appear="{speed: 1000, refreshInterval: 10, ...}'
    App.directive('jsAppear', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsAppear) !== 'undefined') ? scope.$eval(attrs.jsAppear) : new Object();
                var el = jQuery(element);
                var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

                el.appear(function () {
                    setTimeout(function () {
                        el.removeClass('visibility-hidden')
                            .addClass(options.class ? options.class : 'animated fadeIn');
                    }, (jQuery('html').hasClass('ie9') || windowW < 992) ? 0 : (options.timeout ? options.timeout : 0));
                }, { accY: options.offset ? options.offset : 0 });
            }
        };
    });

    // jQuery Appear + jQuery countTo, for more examples you can check out https://github.com/bas2k/jquery.appear and https://github.com/mhuggins/jquery-countTo
    // By adding the attribute (with custom values) 'data-js-count-to="{speed: 1000, refreshInterval: 10, ...}'
    App.directive('jsCountTo', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsCountTo) !== 'undefined') ? scope.$eval(attrs.jsCountTo) : new Object();
                var el = jQuery(element);

                el.appear(function () {
                    el.countTo({
                        speed: options.speed ? options.speed : 1500,
                        refreshInterval: options.refreshInterval ? options.refreshInterval : 15,
                        onComplete: function () {
                            if (options.after) {
                                el.html(el.html() + options.after);
                            } else if (options.before) {
                                el.html(options.before + el.html());
                            }
                        }
                    });
                });
            }
        };
    });

    // SlimScroll, for more examples you can check out http://rocha.la/jQuery-slimScroll
    // By adding the attribute (with custom values) 'data-js-slimscroll="{height: '100px', size: '3px', ...}'
    App.directive('jsSlimscroll', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsSlimscroll) !== 'undefined') ? scope.$eval(attrs.jsSlimscroll) : new Object();
                jQuery(element).slimScroll({
                    height: options.height ? options.height : '200px',
                    size: options.size ? options.size : '5px',
                    position: options.position ? options.position : 'right',
                    color: options.color ? options.color : '#000',
                    alwaysVisible: options.alwaysVisible ? true : false,
                    railVisible: options.railVisible ? true : false,
                    railColor: options.railColor ? options.railColor : '#999',
                    railOpacity: options.railOpacity ? options.railOpacity : .3
                });
            }
        };
    });

    /*
     ********************************************************************************************
     *
     * All the following directives require each plugin's resources (JS, CSS) to be lazy loaded in
     * the page in order to work, so please make sure you've included them in your route configuration
     *
     ********************************************************************************************
     */

    // Magnific Popup, for more examples you can check out http://dimsemenov.com/plugins/magnific-popup/
    // By adding the attribute (with custom value) 'data-js-magnific="{advancedGallery: false}'
    App.directive('jsMagnific', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsMagnific) !== 'undefined') ? scope.$eval(attrs.jsMagnific) : new Object();

                jQuery(element).magnificPopup({
                    delegate: options.advancedGallery ? 'a.img-lightbox' : 'a.img-link',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            }
        };
    });

    // Summernote, for more examples you can check out http://summernote.org/
    // By adding the attribute (with custom value) 'data-js-summernote="{airMode: false}'
    App.directive('jsSummernote', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsSummernote) !== 'undefined') ? scope.$eval(attrs.jsSummernote) : new Object();

                if (options.airMode) {
                    jQuery(element).summernote({
                        airMode: true
                    });
                } else {
                    jQuery(element).summernote({
                        height: 350,
                        minHeight: null,
                        maxHeight: null
                    });
                }
            }
        };
    });

    // Slick, for more examples you can check out http://kenwheeler.github.io/slick/
    // By adding the attribute (with custom values) 'data-js-slider="{arrows: true, dots: true, ...}'
    App.directive('jsSlider', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsSlider) !== 'undefined') ? scope.$eval(attrs.jsSlider) : new Object();

                jQuery(element).slick({
                    arrows: options.arrows ? options.arrows : false,
                    dots: options.dots ? options.dots : false,
                    slidesToShow: options.slidesToShow ? options.arrows : 1,
                    autoplay: options.autoplay ? options.autoplay : false,
                    autoplaySpeed: options.autoplaySpeed ? options.autoplaySpeed : 3000
                });
            }
        };
    });

    // Bootstrap Datepicker, for more examples you can check out https://github.com/eternicode/bootstrap-datepicker
    // By adding the attribute 'data-js-datepicker'
    App.directive('jsDatepicker', function () {
        return {
            link: function (scope, element, attrs) {
                jQuery(element).datepicker({
                    weekStart: 1,
                    autoclose: true,
                    todayHighlight: true
                });
                var el = $(element);
                var angularTriggeredChange = false;
                scope.$watch(attrs["datepickerDate"], function (n, o) {
                    if (!n) {
                        angularTriggeredChange = true;
                        el.datepicker('update', "");
                        return;
                    }
                    // which means multiple select has array of data
                    if (typeof n == "string") {
                        angularTriggeredChange = true;
                        el.datepicker('update', n);
                    }
                }, true);

                el.datepicker().on("change", function (e) {
                    // if the user triggered the change, let angular know                                        
                    var valueSelected = e.target.value;
                    if (!angularTriggeredChange) {
                        scope.$eval(attrs["datepickerDate"] + "='" + valueSelected + "'");
                        scope.$digest();
                    }
                    // if angular triggered the change, then nothing to update
                    angularTriggeredChange = false;
                });
            }
        };
    });

    // Bootstrap Colorpicker, for more examples you can check out http://mjolnic.com/bootstrap-colorpicker/
    // By adding the attribute (with custom value) 'data-js-colorpicker="{format: 'hex', inline: true}'
    App.directive('jsColorpicker', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsColorpicker) !== 'undefined') ? scope.$eval(attrs.jsColorpicker) : new Object();

                jQuery(element).colorpicker({
                    format: options.format ? options.format : 'hex',
                    inline: options.inline ? true : false
                });
            }
        };
    });

    // Masked Inputs, for more examples you can check out http://digitalbush.com/projects/masked-input-plugin/
    // By adding the attribute (with custom value) 'data-js-masked-input="99/99/9999"'
    App.directive('jsMaskedInput', function () {
        return {
            link: function (scope, element, attrs) {
                jQuery(element).mask(attrs.jsMaskedInput);
            }
        };
    });

    // Tags Inputs, for more examples you can check out https://github.com/xoxco/jQuery-Tags-Input
    // By adding the attribute 'data-js-tags-input'
    App.directive('jsTagsInput', function () {
        return {
            link: function (scope, element) {
                jQuery(element).tagsInput({
                    height: '36px',
                    width: '100%',
                    defaultText: 'Add tag',
                    removeWithBackspace: true,
                    delimiter: [',']
                });
            }
        };
    });

    // Select2, for more examples you can check out https://github.com/select2/select2
    // By adding the attribute 'data-js-select2'
    jsSelect2.$inject = ['$timeout', '$filter'];
    App.directive('jsSelect2', jsSelect2);
    js2Select2.$inject = ['$timeout', '$filter'];
    App.directive('js2Select2', js2Select2);
    function js2Select2($timeout, $filter) {
        return {
            link: function (scope, element, attrs) {
                jQuery(element).select2();
    
                scope.$watch(attrs.ngModel, function(){
                    $timeout(function(){
                        element.trigger('change.select2');
                    },100);
                });
            }
        };
    }
    function jsSelect2($timeout, $filter) {
        return {
            link: function (scope, element, attrs) {
                var isMultiple = false;
                var newValueInMultiple = null;
                var newValueInSingle = null;
                var isAddItem = Boolean(attrs["selectAddItem"]);
                if (attrs["multiple"]) {
                    isMultiple = true;
                }
                var options = [],
                    el = $(element),
                    angularTriggeredChange = false,
                    uiTriggeredChange = false,
                    selectOptions = attrs["selectOptions"].split(" in "),
                    property = selectOptions[0],
                    optionsObject = selectOptions[1];
                // watch for changes to the defining data model
                scope.$watch(optionsObject, function (n, o) {
                    if (!n) {
                        return;
                    }
                    var data = [];
                    // format the options for select2 data interface
                    for (var i = 0; i < n.length; i++) {
                        var obj = { id: i, text: n[i] };
                        if (n[i] instanceof Object) {
                            obj.text = obj.text[property];
                        }
                        data.push(obj);
                    }
                    if (attrs["selectOthers"]) {
                        data.push({ id: n.length, text: "OTHERS" })
                    }
                    el.select2('destroy').empty();
                    el.append("<option></option>");
                    if (!isAddItem) {
                        el.select2({ data: data });
                    }
                    else {
                        el.select2({ data: data, tags: true });
                    }
                    $(".select2-container").addClass("full-width");
                    // keep local copy of given options
                    options = n.slice(0);
                    if (attrs["selectOthers"]) {
                        options.push("OTHERS");
                    }
                }, true);
                // watch for changes to the selection data model
                scope.$watch(attrs["selectSelection"], function (n, o) {
                    // which means multiple select has array of data
                    if (!uiTriggeredChange) {
                        if (n instanceof Array) {
                            if (n.length <= 0) {
                                angularTriggeredChange = true;
                                el.val([]).trigger("change");
                                return;
                            }
                            var multiDataIndexes = [];
                            n.forEach(function (item) {
                                var index = options.findIndex(function (val, index) {
                                    //TODO check if any conversion has to be done before converting to camel case
                                    //item = $filter('camelCase')(item);
                                    return (val == item);
                                });
                                if (index != -1) {
                                    multiDataIndexes.push(index);
                                }
                            });
                            if (multiDataIndexes.length > 0) {
                                angularTriggeredChange = true;
                                el.val(multiDataIndexes).trigger("change");
                            }
                        }
                        else {
                            if (!n) {
                                if (attrs["selectDefault"]) {
                                    scope.$eval(attrs["selectSelection"] + "='" + attrs["selectDefault"] + "'");
                                }
                                else {
                                    angularTriggeredChange = true;
                                    el.val('').trigger("change");
                                }
                                return;
                            }
                            findIndexOfValueFromOptions(n);
                        }
                    }
                    uiTriggeredChange = false;

                }, true);

                function findIndexOfValueFromOptions(value) {
                    // select2 is indexed by the array position,
                    // so we iterate to find the right index     
                    for (var i = 0; i < options.length; i++) {
                        var optionValue = options[i];
                        if (optionValue instanceof Object) {
                            optionValue = optionValue[property];
                        }

                        if (optionValue === value) {
                            angularTriggeredChange = true;
                            el.val(i).trigger("change");
                        }
                    }
                }

                function transformInto(arrayOfObjects) {
                    var m = [];
                    arrayOfObjects.forEach(function (item) {
                        m.push({ id: item.id, text: item.text });
                    })
                    return m;
                }

                // Watch for changes to the select UI
                el.select2().on("change", function (e) {
                    if (!angularTriggeredChange) {
                        uiTriggeredChange = true;
                        var valueSelected;
                        // for single select and added new value
                        if (!options[e.target.value] && !isMultiple) {
                            newValueInSingle = (e.target.value).toUpperCase();
                            valueSelected = newValueInSingle;
                        }
                        else { // for single select, but existing value
                            if (!isMultiple)
                                valueSelected = options[e.target.value];
                        }

                        if (valueSelected instanceof Object) {
                            valueSelected = valueSelected[property];
                        }

                        if (isMultiple) {
                            var select2Selection = $(element).select2('data');
                            var multipleValues = transformInto(select2Selection);
                            var scopeVar = attrs["selectSelection"];
                            //declare a new array to push elements
                            scope.$eval(scopeVar + "= []");

                            if (!multipleValues) {
                                return;
                            }
                            multipleValues.forEach(function (item) {
                                // var nIndex = Number(index);
                                // if (isNaN(nIndex)) {
                                if (isNaN(item.id)) {
                                    newValueInMultiple = item.text.toUpperCase();
                                }
                                scope.$eval(scopeVar).push(item.text.toUpperCase());
                                // }
                                // else {
                                //     scope.$eval(scopeVar).push(options[nIndex]);
                                // }
                            });
                        }
                        else {
                            scope.$eval(attrs["selectSelection"] + "='" + valueSelected + "'");
                        }
                        scope.$digest();
                    }
                    // if angular triggered the change, then nothing to update
                    angularTriggeredChange = false;
                });
                el.select2().on("select2:select", function (e) {
                    if (isAddItem && isMultiple) {
                        if (!newValueInMultiple) {
                            return;
                        }
                        scope.$eval(attrs["selectAddCallback"]).call(scope, attrs["selectLookupName"], newValueInMultiple, isMultiple);
                        newValueInMultiple = null;
                    }
                    else if (isAddItem && !isMultiple) {
                        if (!newValueInSingle) {
                            return;
                        }
                        scope.$eval(attrs["selectAddCallback"]).call(scope, attrs["selectLookupName"], e.target.value, isMultiple);
                        newValueInSingle = null;
                    }
                });
            }
        };
    }

    // Bootstrap Notify, for more examples you can check out http://bootstrap-growl.remabledesigns.com/
    // By adding the attribute (with custom values) 'data-js-notify="{icon: 'fa fa-check', message: 'Your message!', ... }'
    App.directive('jsNotify', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsNotify) !== 'undefined') ? scope.$eval(attrs.jsNotify) : new Object();

                jQuery(element).on('click', function () {
                    jQuery.notify({
                        icon: options.icon ? options.icon : '',
                        message: options.message,
                        url: options.url ? options.url : ''
                    },
                        {
                            element: 'body',
                            type: options.type ? options.type : 'info',
                            allow_dismiss: true,
                            newest_on_top: true,
                            showProgressbar: false,
                            placement: {
                                from: options.from ? options.from : 'top',
                                align: options.align ? options.align : 'right'
                            },
                            offset: 20,
                            spacing: 10,
                            z_index: 1033,
                            delay: 5000,
                            timer: 1000,
                            animate: {
                                enter: 'animated fadeIn',
                                exit: 'animated fadeOutDown'
                            }
                        });
                });
            }
        };
    });

    // Draggable items with jQuery, for more examples you can check out https://jqueryui.com/sortable/
    // By adding the attribute 'data-js-draggable-items'
    App.directive('jsDraggableItems', function () {
        return {
            link: function (scope, element) {
                jQuery('.draggable-column', element).sortable({
                    connectWith: '.draggable-column',
                    items: '.draggable-item',
                    dropOnEmpty: true,
                    opacity: .75,
                    handle: '.draggable-handler',
                    placeholder: 'draggable-placeholder',
                    tolerance: 'pointer',
                    start: function (e, ui) {
                        ui.placeholder.css({
                            'height': ui.item.outerHeight(),
                            'margin-bottom': ui.item.css('margin-bottom')
                        });
                    }
                });
            }
        };
    });

    // Easy Pie Chart, for more examples you can check out http://rendro.github.io/easy-pie-chart/
    // By adding the attribute (with custom values) 'data-js-pie-chart="{barColor: '#000', trackColor: '#eee', ... }'
    App.directive('jsPieChart', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsPieChart) !== 'undefined') ? scope.$eval(attrs.jsPieChart) : new Object();

                jQuery(element).easyPieChart({
                    barColor: options.barColor ? options.barColor : '#777777',
                    trackColor: options.trackColor ? options.trackColor : '#eeeeee',
                    lineWidth: options.lineWidth ? options.lineWidth : 3,
                    size: options.size ? options.size : '80',
                    animate: options.animate ? options.animate : 750,
                    scaleColor: options.scaleColor ? options.scaleColor : false
                });
            }
        };
    });

    // Bootstrap Maxlength, for more examples you can check out https://github.com/mimo84/bootstrap-maxlength
    // By adding the attribute (with custom values) 'data-js-maxlength="{alwaysShow: 'true', threshold: '10', ... }'
    App.directive('jsMaxlength', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsMaxlength) !== 'undefined') ? scope.$eval(attrs.jsMaxlength) : new Object();

                jQuery(element).maxlength({
                    alwaysShow: options.alwaysShow ? true : false,
                    threshold: options.threshold ? options.threshold : 10,
                    warningClass: options.warningClass ? options.warningClass : 'label label-warning',
                    limitReachedClass: options.limitReachedClass ? options.limitReachedClass : 'label label-danger',
                    placement: options.placement ? options.placement : 'bottom',
                    preText: options.preText ? options.preText : '',
                    separator: options.separator ? options.separator : '/',
                    postText: options.postText ? options.postText : ''
                });
            }
        };
    });

    // Bootstrap Datetimepicker, for more examples you can check out https://github.com/Eonasdan/bootstrap-datetimepicker
    // By adding the attribute (with custom values) 'data-js-datetimepicker="{format: 'false', useCurrent: 'false', ... }'
    App.directive('jsDatetimepicker', function () {
        return {
            link: function (scope, element, attrs) {
                var options = (typeof scope.$eval(attrs.jsDatetimepicker) !== 'undefined') ? scope.$eval(attrs.jsDatetimepicker) : new Object();
                jQuery(element).datetimepicker({
                    defaultDate:scope[attrs.datetimepickerVal],
                    format: options.format ? options.format : false,
                    useCurrent: options.useCurrent ? options.useCurrent : false,
                    locale: moment.locale('' + (options.locale ? options.locale : '') + ''),
                    showTodayButton: options.showTodayButton ? options.showTodayButton : false,
                    showClear: options.showClear ? options.showClear : false,
                    showClose: options.showClose ? options.showClose : false,
                    sideBySide: options.sideBySide ? options.sideBySide : false,
                    inline: options.inline ? options.inline : false,
                    icons: {
                        time: 'si si-clock',
                        date: 'si si-calendar',
                        up: 'si si-arrow-up',
                        down: 'si si-arrow-down',
                        previous: 'si si-arrow-left',
                        next: 'si si-arrow-right',
                        today: 'si si-size-actual',
                        clear: 'si si-trash',
                        close: 'si si-close'
                    }                 
                });
                
                jQuery(element).on("dp.change", function (e) {
                    // if the user triggered the change, let angular know                                        
                    var valueSelected = moment(e.date._d).format("YYYY-MM-DD HH:mm:ss");
                    scope.$eval(attrs["datepickerDate"] + "='" + valueSelected + "'");
                    scope.$digest();
                });
                
            }
        };
    });

    // Ion Range Slider, for more examples you can check out https://github.com/IonDen/ion.rangeSlider
    // By adding the attribute 'data-js-range-slider'
    App.directive('jsRangeSlider', function () {
        return {
            link: function (scope, element) {
                jQuery(element).ionRangeSlider({
                    input_values_separator: ';'
                });
            }
        };
    });

    // Dropzone, for more examples you can check out http://www.dropzonejs.com/#usage
    // By adding the attribute 'data-js-dropzone' to your form
    App.directive('jsDropzone', function () {
        return {
            link: function (scope, element) {
                scope.dropzone = new Dropzone(element[0]);      
            }
        };
    });

    // SimpleMDE, for more examples you can check out https://github.com/NextStepWebs/simplemde-markdown-editor
    // By adding the attribute 'data-js-simplemde' to a textarea
    App.directive('jsSimplemde', function () {
        return {
            link: function (scope, element, attrs) {
                new SimpleMDE({ element: jQuery(element)[0] });
            }
        };
    });

   /* App.directive('autocomplete', autocomplete);
    function autocomplete() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                jQuery(element).autoComplete({
                    source: function (term, suggest) {
                        term = term.toLowerCase();

                        scope[attrs["source"]](term, function (err, suggestions) {
                            suggest(suggestions);
                        });
                    },
                    select: function (event, ui) {
                        console.log(ui);
                        ngModelCtrl.$setViewValue(ui.item);
                        scope.$apply();
                    }
                });
            }
        };
    }*/
})();