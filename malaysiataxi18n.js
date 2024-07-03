const messages = {
    "en": {
        "intro": {
            "content": "Welcome to the Malaysia Tax Calculator. This website has been made for you to quickly get an idea of the amount of taxes you might have to pay especially for the work visa holders. For detailed tax guidelines specific to your situation, refer to Lembaga Hasil Dalam Negeri Malaysia (LHDNM).",
            
            
        },
        "salary": {
            "title": "How much do you make {ayear}? {expenses}",
            "ayear": "a year",
            "expenses": "(after expenses, if any)",
            "net_income": "Your net income is:"
        },
        "about": {
            "title": "About the {website}",
            "content": "The Malaysia Tax Calculator referred the Japan Tax Calculator and Singapore Tax Calculator UI design and code base."
        },
        "disclaimer": {
            "title": "Disclaimer",
            "content": "All the information on the Malaysia Tax Calculator is published for general information purpose only. The website does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk. We will not be liable for any losses and/or damages in connection with the use of our website."
        }
    },
    
    
}

const locale = (navigator.language || navigator.browserLanguage).toLowerCase();

const i18n = new VueI18n({
    locale: (locale == 'zh-tw' || locale == 'zh-cn') ? locale : 'en',
    messages: messages,
})

var app = new Vue({
    el: '#wrapper',

    i18n: i18n,

    data: {

        // USER ENTRIES
        uiSalary: 75400,
        salary: 0,
        isPermanentResident: false,
        isNonResidents: false,

        // CALCULATIONS
        epfContributionAmount: 0,
        incomeTaxAmount: 0,
        incomeNet: 0,

        // PERCENT OF SALARY
        epfWithholdPercent: 0,
        incomeTaxPercent: 0,
        incomeNetPercent: 0

    },

    mounted: function() {
        this.calculateAll();
    },

    watch: {

        isPermanentResident: function() {
            this.calculateAll();
        },
        isNonResidents: function() {
            this.calculateAll();
        },
        uiSalary: function(newSalary) {
            this.calculateAll();
        }

    },

    methods: {

        calculateAll: function() {
            this.salary = parseInt(this.uiSalary);
            this.taxableIncome = this.salary;
            this.calculateepfContributionAmount();
            this.calculateIncomeTaxAmount();
            this.calculateIncomeNet();
        },

        calculateepfContributionAmount: function() {
            var taxableIncome = this.taxableIncome;
            this.epfContributionAmount = 0;

            if (this.isPermanentResident) {
                if (taxableIncome > 400000) {
                    this.epfContributionAmount = 3 * 0.11;
                }
                else {
                    this.epfContributionAmount = taxableIncome * 0.11;
                }
            }

            this.epfWithholdPercent = Math.round(
                this.epfContributionAmount / this.salary * 100);
        },

        calculateIncomeTaxAmount: function() {
            var taxableIncome = this.taxableIncome - this.epfContributionAmount;
            this.incomeTaxAmount = 0;

            if (taxableIncome >= 400001) {
                this.incomeTaxAmount = (taxableIncome - 400000) * 0.25 + 78000;
            }
            else if (taxableIncome >= 250001) {
                this.incomeTaxAmount = (taxableIncome - 250000) * 0.245 + 44500;
            }
            else if (taxableIncome >= 100001) {
                this.incomeTaxAmount = (taxableIncome - 100000) * 0.24 + 16500;
            }
            else if (taxableIncome >= 70001) {
                this.incomeTaxAmount = (taxableIncome - 70000) * 0.21 + 7700;
            }
            else if (taxableIncome >= 50001) {
                this.incomeTaxAmount = (taxableIncome - 50000) * 0.14 + 3250;
            }
            else if (taxableIncome >= 35001) {
                this.incomeTaxAmount = (taxableIncome - 35000) * 0.08 + 600;
            }
            else if (taxableIncome >= 20001) {
                this.incomeTaxAmount = (taxableIncome) * 0.03 + 150;
            }
            else {
                this.incomeTaxAmount = 0;
            }
            

            // 15% of gross income or 22% of net income
            if (this.isNonResidents) {
                if (taxableIncome * 0.15 > this.incomeTaxAmount) {
                    this.incomeTaxAmount = taxableIncome * 0.15
                }
            }

            this.incomeTaxPercent = Math.round(this.incomeTaxAmount / this.salary * 100);
        },

        calculateIncomeNet: function() {
            this.incomeNet = this.salary - this.epfContributionAmount - this.incomeTaxAmount;
            this.incomeNetPercent = Math.round(this.incomeNet / this.salary * 100);
            //console.debug("Income Net: ", this.incomeNet);
        },

    },

    filters: {

        toMYR: function(value) {
            if (!value)
                return 'RM0';
            var val = Math.round(value);
            return "RM" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    }
})
