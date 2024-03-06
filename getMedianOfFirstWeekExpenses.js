

// yearMonth = "2023-01"
function getFirstSundayOfYearMonth (yearMonth){ 
    // a function that given year and month, returns the date of the first Sunday in that year month
    let days = ["01", "02", "03","04", "05", "06", "07"];

    for (let day of days) {
        // 2023-01 => 2023-01-03
        let date = new Date(`${yearMonth}-${day}`);
        
        // example, 2023-01-05 is Sunday, so getDay() is 0
        if (date.getDay() === 0) {
            // then we return "5"
            return date.getDate()
        }
    }
    
    throw new Error("Invalid yearMonth")
}


function get_median_of_first_week_expenses(expenses) {
    let totalExpenses = [];

    for (let yearMonth in expenses) {
        for (let day in expenses[yearMonth]) {
            // it's creating a Date object from a date string
            let date = new Date(`${yearMonth}-${day}`); 
            let firstSundayDate = getFirstSundayOfYearMonth(yearMonth);

            if (date.getDate() <= firstSundayDate) {
                for (let category in expenses[yearMonth][day]) {
                    totalExpenses = totalExpenses.concat(expenses[yearMonth][day][category]);
                }
            }
        }
    }

    totalExpenses.sort((a, b) => a - b);
    const length = totalExpenses.length;
    let median = null;

    if (length > 0) {
        if (length % 2 === 0) {
            median = (totalExpenses[length / 2 - 1] + totalExpenses[length / 2]) / 2;
        } else {
            median = totalExpenses[Math.floor(length / 2)];
        }
    }

    return median;
}

const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
}

console.log(get_median_of_first_week_expenses(expenses));
