(function init() {
    //Add below line at the top of your JavaScript code
    Dropzone.autoDiscover = false;
    //This will prevent Dropzone to instantiate on it's own unless you are using dropzone class for styling

})();
(function () {
    'use strict';
    // Create our angular module
    var App = angular.module('app', [
        'ngStorage',
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'oc.lazyLoad',
        'thatisuday.dropzone',
        'ngSanitize',
        'ngTagsInput'
    ]);

    // // Router configuration
    App.config(configuration);
    configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configuration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('setupAccount');
        $stateProvider
            .state("dashboard", {
                url: "/dashboard",
                template: '<ins-dashboard> </ins-dashboard>',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#css-bootstrap',
                            serie: true,
                            files: [
                                'bower_components/slick-carousel/slick/slick.css',
                                'bower_components/slick-carousel/slick/slick-theme.css',
                                'bower_components/slick-carousel/slick/slick.js',
                                'bower_components/Chart.js/Chart.js'
                            ]
                        });
                    }]
                }
            })
            // .state('feeclct', {
            //     url: '/feeclct',
            //     template: '<ins-fee-collection></ins-fee-collection>'
            // })

            .state('setupAccount', {
                url: '/accountSetup',
                templateUrl: 'app/modules/feeCollection/account_setup.html',
                controller: 'accountSetupCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })

            .state('feeComponent', {
                url: '/feeComponent',
                templateUrl: 'app/modules/feeCollection/fee_component.html',
                controller: 'feeComponentCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })

            .state('feeTemplate', {
                url: '/feeTemplate',
                templateUrl: 'app/modules/feeCollection/fee_template.html',
                controller: 'feeTemplateCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })

            .state('createFeeStructure', {
                url: '/createFeeStructure',
                templateUrl: 'app/modules/feeCollection/create_fee_structure.html',
                controller: 'createFeeStructureCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#css-bootstrap',
                            serie: true,
                            files: [
                                'bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css',
                                'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
                                'bower_components/moment/min/moment.min.js',
                                'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                'bower_components/sweetalert2/dist/sweetalert2.js',
                                'bower_components/sweetalert2/dist/sweetalert2.min.css'
                            ]
                        });
                    }]
                }
            })

            .state('editFeeStructure', {
                url: '/editFeeStructure/:id',
                templateUrl: 'app/modules/feeCollection/edit_fee_structure.html',
                controller: 'editFeeStructureCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            insertBefore: '#css-bootstrap',
                            serie: true,
                            files: [
                                'bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css',
                                'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
                                'bower_components/moment/min/moment.min.js',
                                'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                            ]
                        });
                    }]
                }
            })
            .state('concessionRules', {
                url: '/concessionRules',
                templateUrl: 'app/modules/feeCollection/concession_rules.html',
                controller: 'concessionRulesCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })

            .state('refundRules', {
                url: '/refundRules',
                templateUrl: 'app/modules/feeCollection/refund_rules.html',
                controller: 'refundRulesCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })

            .state('feeCollection', {
                url: '/feeCollection',
                templateUrl: 'app/modules/feeCollection/fee_collection.html',
                controller: 'feeCollectionCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })
            .state('browseFeeStructure', {
                url: '/browseFeeStructure',
                templateUrl: 'app/modules/feeCollection/browse_fee_structure.html',
                controller: 'browseFeeStructureCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    }]
                }
            })
    }


    // Tooltips and Popovers configuration
    App.config(['$uibTooltipProvider',
        function ($uibTooltipProvider) {
            $uibTooltipProvider.options({
                appendToBody: true
            });
        }
    ]);

    // Custom UI helper functions
    App.factory('uiHelpers', function () {
        return {

            // Handles #main-container height resize to push footer to the bottom of the page
            uiHandleMain: function () {
                var lMain = jQuery('#main-container');
                var hWindow = jQuery(window).height();
                var hHeader = jQuery('#header-navbar').outerHeight();
                var hFooter = jQuery('#page-footer').outerHeight();

                if (jQuery('#page-container').hasClass('header-navbar-fixed')) {
                    lMain.css('min-height', hWindow - hFooter);
                } else {
                    lMain.css('min-height', hWindow - (hHeader + hFooter));
                }
            },
            // Handles transparent header functionality 
            uiHandleHeader: function () {
                var lPage = jQuery('#page-container');

                if (lPage.hasClass('header-navbar-fixed') && lPage.hasClass('header-navbar-transparent')) {
                    jQuery(window).on('scroll', function () {
                        if (jQuery(this).scrollTop() > 20) {
                            lPage.addClass('header-navbar-scroll');
                        } else {
                            lPage.removeClass('header-navbar-scroll');
                        }
                    });
                }
            },

            // Handles page loader functionality
            uiLoader: function (mode) {
                var lBody = jQuery('body');
                var lpageLoader = jQuery('#page-loader');

                if (mode === 'show') {
                    if (lpageLoader.length) {
                        lpageLoader.fadeIn(250);
                    } else {
                        lBody.prepend('<div id="page-loader"></div>');
                    }
                } else if (mode === 'hide') {
                    if (lpageLoader.length) {
                        lpageLoader.fadeOut(250);
                    }
                }
            },
            // Handles blocks API functionality
            uiBlocks: function (block, mode, button) {
                // Set default icons for fullscreen and content toggle buttons
                var iconFullscreen = 'si si-size-fullscreen';
                var iconFullscreenActive = 'si si-size-actual';
                var iconContent = 'si si-arrow-up';
                var iconContentActive = 'si si-arrow-down';

                if (mode === 'init') {
                    // Auto add the default toggle icons
                    switch (button.data('action')) {
                        case 'fullscreen_toggle':
                            button.html('<i class="' + (button.closest('.block').hasClass('block-opt-fullscreen') ? iconFullscreenActive : iconFullscreen) + '"></i>');
                            break;
                        case 'content_toggle':
                            button.html('<i class="' + (button.closest('.block').hasClass('block-opt-hidden') ? iconContentActive : iconContent) + '"></i>');
                            break;
                        default:
                            return false;
                    }
                } else {
                    // Get block element
                    var elBlock = (block instanceof jQuery) ? block : jQuery(block);

                    // If element exists, procceed with blocks functionality
                    if (elBlock.length) {
                        // Get block option buttons if exist (need them to update their icons)
                        var btnFullscreen = jQuery('[data-js-block-option][data-action="fullscreen_toggle"]', elBlock);
                        var btnToggle = jQuery('[data-js-block-option][data-action="content_toggle"]', elBlock);

                        // Mode selection
                        switch (mode) {
                            case 'fullscreen_toggle':
                                elBlock.toggleClass('block-opt-fullscreen');

                                // Enable/disable scroll lock to block
                                if (elBlock.hasClass('block-opt-fullscreen')) {
                                    jQuery(elBlock).scrollLock('enable');
                                } else {
                                    jQuery(elBlock).scrollLock('disable');
                                }

                                // Update block option icon
                                if (btnFullscreen.length) {
                                    if (elBlock.hasClass('block-opt-fullscreen')) {
                                        jQuery('i', btnFullscreen)
                                            .removeClass(iconFullscreen)
                                            .addClass(iconFullscreenActive);
                                    } else {
                                        jQuery('i', btnFullscreen)
                                            .removeClass(iconFullscreenActive)
                                            .addClass(iconFullscreen);
                                    }
                                }
                                break;
                            case 'fullscreen_on':
                                elBlock.addClass('block-opt-fullscreen');

                                // Enable scroll lock to block
                                jQuery(elBlock).scrollLock('enable');

                                // Update block option icon
                                if (btnFullscreen.length) {
                                    jQuery('i', btnFullscreen)
                                        .removeClass(iconFullscreen)
                                        .addClass(iconFullscreenActive);
                                }
                                break;
                            case 'fullscreen_off':
                                elBlock.removeClass('block-opt-fullscreen');

                                // Disable scroll lock to block
                                jQuery(elBlock).scrollLock('disable');

                                // Update block option icon
                                if (btnFullscreen.length) {
                                    jQuery('i', btnFullscreen)
                                        .removeClass(iconFullscreenActive)
                                        .addClass(iconFullscreen);
                                }
                                break;
                            case 'content_toggle':
                                elBlock.toggleClass('block-opt-hidden');

                                // Update block option icon
                                if (btnToggle.length) {
                                    if (elBlock.hasClass('block-opt-hidden')) {
                                        jQuery('i', btnToggle)
                                            .removeClass(iconContent)
                                            .addClass(iconContentActive);
                                    } else {
                                        jQuery('i', btnToggle)
                                            .removeClass(iconContentActive)
                                            .addClass(iconContent);
                                    }
                                }
                                break;
                            case 'content_hide':
                                elBlock.addClass('block-opt-hidden');

                                // Update block option icon
                                if (btnToggle.length) {
                                    jQuery('i', btnToggle)
                                        .removeClass(iconContent)
                                        .addClass(iconContentActive);
                                }
                                break;
                            case 'content_show':
                                elBlock.removeClass('block-opt-hidden');

                                // Update block option icon
                                if (btnToggle.length) {
                                    jQuery('i', btnToggle)
                                        .removeClass(iconContentActive)
                                        .addClass(iconContent);
                                }
                                break;
                            case 'refresh_toggle':
                                elBlock.toggleClass('block-opt-refresh');

                                // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
                                if (jQuery('[data-js-block-option][data-action="refresh_toggle"][data-action-mode="demo"]', elBlock).length) {
                                    setTimeout(function () {
                                        elBlock.removeClass('block-opt-refresh');
                                    }, 2000);
                                }
                                break;
                            case 'state_loading':
                                elBlock.addClass('block-opt-refresh');
                                break;
                            case 'state_normal':
                                elBlock.removeClass('block-opt-refresh');
                                break;
                            case 'close':
                                elBlock.hide();
                                break;
                            case 'open':
                                elBlock.show();
                                break;
                            default:
                                return false;
                        }
                    }
                }
            }
        };
    });

    // Run our App
    App.run(function ($rootScope, uiHelpers) {
        // Access uiHelpers easily from all controllers
        $rootScope.helpers = uiHelpers;

        // On window resize or orientation change resize #main-container & Handle scrolling
        var resizeTimeout;

        jQuery(window).on('resize orientationchange', function () {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(function () {

                $rootScope.helpers.uiHandleMain();
            }, 150);
        });
    });

    // Application Main Controller
    App.controller('AppCtrl', ['$scope', '$localStorage', '$rootScope', '$stateParams', 'rolesToEntitlements', 'roleToStates', '$window',
        function ($scope, $localStorage, $rootScope, $stateParams, rolesToEntitlements, roleToStates, $window) {
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;

            $rootScope.$on('$stateChangeSuccess', function () {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });

            $scope.viewMyAccount = function () {
                $window.location = $rootScope.Auth.createAccountUrl();
            };

            $scope.logout = function () {
                $rootScope.Auth.logout();
            };

            // Template Settings
            $scope.webapp = {
                version: '3.1', // Template version
                localStorage: false, // Enable/Disable local storage
                settings: {

                    headerFixed: true // Enables fixed header
                }
            };

            // If local storage setting is enabled
            if ($scope.webapp.localStorage) {
                // Save/Restore local storage settings
                if ($scope.webapp.localStorage) {
                    if (angular.isDefined($localStorage.webappSettings)) {
                        $scope.webapp.settings = $localStorage.webappSettings;
                    } else {
                        $localStorage.webappSettings = $scope.webapp.settings;
                    }
                }

                // Watch for settings changes
                $scope.$watch('webapp.settings', function () {
                    // If settings are changed then save them to localstorage
                    $localStorage.webappSettings = $scope.webapp.settings;
                }, true);
            }


            // When view content is loaded
            $scope.$on('$viewContentLoaded', function () {
                // Hide page loader
                $scope.helpers.uiLoader('hide');

                // Resize #main-container
                $scope.helpers.uiHandleMain();
            });
        }
    ]);

})();

//initialize keycloak and bootstrap angular
(function () {
    'use strict';
    angular.element(document).ready(function () {
        var keycloak = new Keycloak(window.keycloakConfig);
        //register listeners
        registerAuthListeners(keycloak);
        var keycloakEnabled = false;

        if (keycloakEnabled) {
            keycloak.init({
                onLoad: 'login-required',
                checkLoginIframe: true,
                checkLoginIframeInterval: 5,
                responseMode: 'fragment'
            }).success(function (authenticated) {
                angular.module('app').factory('Auth', function () {
                    return keycloak;
                });
                angular.bootstrap(document, ['app']);
            }).error(function () {
                window.location.reload();
            });
        } else {
            var keycloak = new Keycloak(window.keycloakConfig);
            angular.module('app').factory('Auth', function () {
                keycloak.tokenParsed = {
                    email: 'admin@psg',
                    preferred_username: 'admin',
                    name: 'Admin',
                    userRoles: {
                        'SYSTEM_ADMIN': 1
                    }
                };
                keycloak.hasResourceRole = function (role) {
                    return (role == "SYSTEM_ADMIN");
                };
                keycloak.principal = keycloak.tokenParsed;
                // keycloak.tokenParsed = {
                //     email: '16utc35@psg',
                //     preferred_username: '16utc35',
                //     name: '16UTC35',
                //     userRoles: {
                //         'PLACEMENT_STUDENT': 1
                //     }
                // };
                // keycloak.hasResourceRole = function (role) {
                //     return (role == "PLACEMENT_STUDENT");
                // };

                return keycloak;
            });
            angular.bootstrap(document, ['app']);
        }
    });//end document ready

    function registerAuthListeners(Auth) {
        Auth.onReady = function () {
            console.log("Adapter is initialized");
        };

        Auth.onAuthSuccess = function () {
            console.log("User is successfully authenticated");
            loadRootScopeWithUserProfile(Auth);
        };

        Auth.onAuthError = function () {
            console.log("Error during authentication");
        };

        Auth.onAuthRefreshSuccess = function () {
            //Called when the token is refreshed.
            console.log("Auth refresh success");
        };

        Auth.onAuthRefreshError = function () {
            //Called if there was an error while trying to refresh the token.
            console.log("Auth refresh error");
        };

        Auth.onAuthLogout = function () {
            //Called if the user is logged out (will only be called if the session status iframe is enabled, or in Cordova mode).
            console.log("Auth logout successfully");
        };

        Auth.onTokenExpired = function () {
            //Called when the access token is expired. 
            //If a refresh token is available the token can be refreshed with updateToken, or 
            //in cases where it is not (that is, with implicit flow) you can redirect to login screen to obtain a new access token.
            console.log("Token expired");
        };
    }

    //store / cache user profile in rootScope
    function loadRootScopeWithUserProfile(Auth) {
        Auth.principal = Auth.tokenParsed;
        Auth.principal.userRoles = {};
        Auth.principal.userEntitlements = getEntitlements(Auth, rolesToEntitlements);
        Auth.principal.userStates = getStates(Auth, roleToStates);
        console.log("obtained post auth" + Auth.principal);
    }

    function getEntitlements(Auth, allRoles) {
        var userEntitlements = {};
        Object.getOwnPropertyNames(allRoles).forEach(function (role) {
            if (Auth.principal.resource_access["ies_events"].roles.indexOf(role) >= 0) {
                //get entitlements for the current role
                console.log("fetching entitlements for role " + role);
                var roleWithEntitlements = allRoles[role];
                Auth.principal.userRoles[role] = true;
                roleWithEntitlements.forEach(function (e) {
                    //check each entitlement if present in userEntitlements and add it to the array if not present
                    if (!userEntitlements[e]) {
                        console.log("Adding entitlement to user " + e);
                        userEntitlements[e] = true;
                    }
                });
            }
        });
        console.log(userEntitlements);
        return userEntitlements;
    }

    //get the states for the role
    function getStates(Auth, allRoles) {
        var userStates = {};
        Object.getOwnPropertyNames(allRoles).forEach(function (role) {
            if (Auth.principal.realm_access.roles.indexOf(role) >= 0) {
                //get entitlements for the current role
                console.log("fetching states for role " + role);
                var roleWithStates = allRoles[role];
                roleWithStates.forEach(function (e) {
                    //check each state if present in userState and add it to the array if not present
                    if (!userStates[e]) {
                        console.log("Adding state to user " + e);
                        userStates[e] = true;
                    }
                });
            }
        });
        console.log(userStates);
        return userStates;
    }

    var rolesToEntitlements =
        {
            "SYSTEM_ADMIN": [
                "VIEW_STUDENTS",
                "VIEW_DASHBOARD",
                "CONFIGURE_APPLICATION"
            ],
            "EVENT_ADMIN": [
                "VIEW_STUDENTS_IN_DEPARTMENT",
                "VIEW_DASHBOARD"
            ],
            "PROGRAM_COORDINATOR": [
                "VIEW_STUDENTS_IN_PROGRAM",
                "VIEW_DASHBOARD"
            ],
            "CLASS_TUTOR": [
                "VIEW_STUDENTS_IN_CLASS",
                "VIEW_DASHBOARD"
            ],
            "STUDENT": [
                "MY_PROFILE"
            ],
            "CLASS_REP": [
                "VIEW_STUDENTS_IN_CLASS",
                "MY_PROFILE"
            ]
        };

    //added entitlements (key) and state(value)
    //all these states used in current example come under application sales 
    var roleToStates =
        {
            "STUDENTS_ADMIN": [
                "dashboard",
                "students",
                "personalDetails",
                "debar",
                "tcDetails",
                "convocation",
                "certificate",
                "studentprofileview",
                "admissionDetails"
            ],
            "PLACEMENT_OFFICE": [
                "dashboard",
                "students",
                "personalDetails",
                "debar",
                "tcDetails",
                "convocation",
                "certificate",
                "studentprofileview",
                "admissionDetails"
            ],
            "HOD": [
                "dashboard",
                "students",
                "personalDetails",
                "studentprofileview",
                "admissionDetails"
            ],
            "PROGRAM_COORDINATOR": [
                "dashboard",
                "students",
                "personalDetails",
                "studentprofileview"
            ],
            "CLASS_TUTOR": [
                "dashboard",
                "students",
                "personalDetails",
                "studentprofileview"
            ],
            "STUDENT": [
                "studentprofileview"
            ],
            "CLASS_REP": [
                "studentprofileview"
            ]
        };

    angular.module('app').constant("rolesToEntitlements", rolesToEntitlements);
    angular.module('app').constant("roleToStates", roleToStates);

    //initialize and login to keycloak as well as attach event handlers
    angular.module('app').run(['$rootScope', '$location', 'Auth', 'rolesToEntitlements', 'roleToStates', runKeycloak]);
    function runKeycloak($rootScope, $location, Auth, rolesToEntitlements, roleToStates) {
        $rootScope.Auth = Auth;

        //login to keycloak
        $rootScope.$on("event:auth-loginRequired", function () {
            console.log("Event auth-loginRequired acquired")
            var loginOptions = {
                redirectUri: window.location,
                prompt: "none",
                maxAge: 3600,
                loginHint: "",
                action: "login",
                locale: "en"
            };
            console.log(createLoginUrl(loginOptions));
            Auth.login(loginOptions);
        });
    }//end init

})();//end function