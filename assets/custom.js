(function () {
    var loadScript = function (url, callback) {

        /* JavaScript that will load the jQuery library on Google's CDN.
           We recommend this code: http://snipplr.com/view/18756/loadscript/.
           Once the jQuery library is loaded, the function passed as argument,
           callback, will be executed. */

    };

    var myAppJavaScript = function ($) {
        /* Your app's JavaScript here.
           $ in this scope references the jQuery object we'll use.
           Don't use 'jQuery', or 'jQuery191', here. Use the dollar sign
           that was passed as argument.*/

        $('html body').on('click.siteNav', function (evt) {
            var $el = $(this);
            if ($el.hasClass('site-nav--has-dropdown')) {
                evt.preventDefault();
            }
        })

        // Registration validators
        let inputValids = {
            firstNameInput: false, lastNameInput: false, emailInput: false, passwordInput: false, companyNameInput: false,
            businessTypeInput: false, jobTitleInput: false, companyPhoneInput: false, companyLocationInput: false, howFindInput: false
        };
        const firstNameInput = $('#RegisterForm-FirstName');
        const lastNameInput = $('#RegisterForm-LastName');
        const emailInput = $('#RegisterForm-email');
        const passwordInput = $('#RegisterForm-password');
        const companyNameInput = $('#RegisterForm-CompanyName');
        const businessTypeInput = $('#RegisterForm-BusinessType');
        const jobTitleInput = $('#RegisterForm-JobTitle');
        const companyPhoneInput = $('#RegisterForm-CompanyPhone');
        const companyLocationInput = $('#RegisterForm-CompanyLocationNumber');
        const howFindInput = $('#RegisterForm-HowFind');
        const register = $('#register');

        function isValidFirstName(firstName) {
            const valid = firstName !== '';
            inputValids.firstNameInput = valid;
            return valid;
        }

        function isValidLastName(lastName) {
            const valid = lastName !== '';
            inputValids.lastNameInput = valid;
            return valid;
        }

        function isValidEmail(email) {
            const valid = /[^@]+@[^@.]+\.[a-z]+/i.test(email);
            inputValids.emailInput = valid;
            return valid;
        }

        function isValidPassword(password) {
            const valid = password.length >= 5;
            inputValids.passwordInput = valid;
            return valid;
        }

        function isValidCompanyName(companyName) {
            const valid = companyName !== '';
            inputValids.companyNameInput = valid;
            return valid;
        }

        function isValidBusinessType(businessType) {
            const valid = businessType !== '' && businessType !== 'null' && businessType;
            inputValids.businessTypeInput = valid;
            return valid;
        }

        function isValidJobTitle(jobTitle) {
            const valid = jobTitle !== '' && jobTitle !== 'null' && jobTitle;
            inputValids.jobTitleInput = valid;
            return valid;
        }

        function isValidCompanyPhone(phone) {
            const valid = /^\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(phone);
            inputValids.companyPhoneInput = valid;
            return valid;
        }

        function isValidCompanyLocation(companyLocation) {
            const valid = companyLocation > 0;
            inputValids.companyLocationInput = valid;
            return valid;
        }

        function isValidHowFind(howFind) {
            const valid = (howFind !== '' && howFind !== 'null' && howFind !== null);
            inputValids.howFindInput = valid;
            return valid;
        }

        function formatPhone(text) {
            const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
            return text.replace(regex, '($1) $2-$3');
        }

        function showOrHideTip(show, element) {
            if (show) {
                element.style.display = "flex";
            } else {
                element.style.display = "none";
            }
        }

        function canSubmit() {
            let canSubmit = true;
            inputArr = Object.keys(inputValids);
            for(let i = 0; i <= inputArr.length - 1; i ++) {
                if (!inputValids[inputArr[i]]) {
                    canSubmit = false;
                    break;
                }
            }
            return canSubmit;
        }

        function createListener(validator) {
            return e => {
              const text = e.target.value;
              const valid = validator(text);
              const showMessage = !valid;
              const errorMessage = e.target.nextElementSibling;
              showOrHideTip(showMessage, errorMessage);
              if (canSubmit()) {
                register.removeAttr('disabled');
              } else {
                register.attr('disabled', true);
              };
            };
        }


        firstNameInput.keyup(createListener(isValidFirstName));
        firstNameInput.blur(createListener(isValidFirstName));

        lastNameInput.keyup(createListener(isValidLastName));
        lastNameInput.blur(createListener(isValidLastName));

        emailInput.keyup(createListener(isValidEmail));
        emailInput.blur(createListener(isValidEmail));

        passwordInput.keyup(createListener(isValidPassword));
        passwordInput.blur(createListener(isValidPassword));

        companyNameInput.keyup(createListener(isValidCompanyName));
        companyNameInput.blur(createListener(isValidCompanyName));

        businessTypeInput.focus(createListener(isValidBusinessType));
        businessTypeInput.change(createListener(isValidBusinessType));
        businessTypeInput.blur(createListener(isValidBusinessType));

        jobTitleInput.focus(createListener(isValidJobTitle));
        jobTitleInput.change(createListener(isValidJobTitle));
        jobTitleInput.blur(createListener(isValidJobTitle));

        companyPhoneInput.keyup(createListener(isValidCompanyPhone));
        companyPhoneInput.blur(e => {
            createListener(isValidCompanyPhone);
            e.target.value = formatPhone(e.target.value);
        });

        companyLocationInput.keyup(createListener(isValidCompanyLocation));
        companyLocationInput.mouseup(createListener(isValidCompanyLocation));
        companyLocationInput.blur(createListener(isValidCompanyLocation));
        
        howFindInput.focus(createListener(isValidHowFind));
        howFindInput.change(createListener(isValidHowFind));
        howFindInput.blur(createListener(isValidHowFind));

    };

    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
            jQuery191 = jQuery.noConflict(true);
            myAppJavaScript(jQuery191);
        });
    } else {
        myAppJavaScript(jQuery);
    }
})();