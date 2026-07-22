// Menu System - Aapke exact programs ke sath

let choice = prompt("Menu:\n1. Swapping\n2. Age Convertor\n3. Square Root\n4. Calculator\n5. Greatest Smallest Number\n6. Ascending Order\n7. Result card\n\n");

if (choice == 1) {
    //swapping
    console.log("check")
    let a=parseInt(prompt("enter a first number"));
    let b=parseInt(prompt("enter second number"));
    let c;
    c=a;
    a=b;
    b=c;
    console.log("a = ",a);
    console.log("b = ",b);
    alert(c)
    document.write(c)
    
} else if (choice == 2) {
    //age convertor
    let date = parseInt(prompt("Enter any birthdate ")); 
    let month = parseInt(prompt("Enter any birthmonth")); 
    let year = parseInt(prompt("Enter any birthyear ")); 

    let birthday = new Date(year, month - 1, date);
    let today = new Date();
    let age= today - birthday;

    let yearsDiff = today.getFullYear() - birthday.getFullYear();
    let monthsDiff = today.getMonth() - birthday.getMonth();
    let totalMonths = yearsDiff * 12 + monthsDiff;

    let adjust = Number(today.getDate() < birthday.getDate()); 
    totalMonths = totalMonths - adjust;
    let ageYears = Math.floor(totalMonths / 12);
    let diffInMs = today - birthday; 
    let totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    let totalmonth = Math.floor(age / (1000 * 60 * 60 * 24 * 12));
    let currentage = Math.floor (age / (1000 * 60 * 60 * 24 * 365.25));

    console.log("your birthday is " + date +"-" + month + "-" + year);
    console.log( "now u are "+ currentage +" years old");
    console.log(" Total months since birth: " + totalMonths + " months");
    console.log(" Total days since birth: " + totalDays + " days");
    
} else if (choice == 3) {
    // sqaure root
    let n = parseInt(prompt("Enter three numbees "));  
    let num = n**(1/2);
    console.log( "square root of munber  " +n+  " is" , num);
    
} else if (choice == 4) {
    // calculator
    let num1 = parseFloat(prompt("Enter first number:"));
    let operator = prompt("Enter operator (+, -, *, /):");
    let num2 = parseFloat(prompt("Enter second number:"));
    let result;

    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {
        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "/") {
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
    } else {
        result = "Invalid operator";
    }

    console.log(`${num1} ${operator} ${num2} = ${result}`);
    
} else if (choice == 5) {
    //greatest smallest nmbr
    let num1 = parseInt(prompt("Enter number 1:"));
    let num2 = parseInt(prompt("Enter number 2:"));
    let num3 = parseInt(prompt("Enter number 3:"));
    let num4 = parseInt(prompt("Enter number 4:"));
    let num5 = parseInt(prompt("Enter number 5:"));

    let largest = num1;
    if (num2 > largest) {
      largest = num2;
    } else if (num3 > largest) {
      largest = num3;
    } else if (num4 > largest) {
      largest = num4;
    } else if (num5 > largest) {
      largest = num5;
    }
    let smallest = num1;

    if (num2 < smallest) {
      smallest = num2;
    }
    if (num3 < smallest) {
      smallest = num3;
    }
    if (num4 < smallest) {
      smallest = num4;
    }
    if (num5 < smallest) {
      smallest = num5;
    }

    console.log("Large number is: " + largest);
    console.log("Small number is: " + smallest);
    
} else if (choice == 6) {
    // Ascending order using only if-else (no array, no sort)
    let a = parseFloat(prompt("enter nmbr 1"));
    let b = parseFloat(prompt("enter number 2"));
    let c = parseFloat(prompt("enter number 3"));
    let d = parseFloat(prompt("enter number 4"));
    let e = parseFloat(prompt("enter number 5"));

    let smallest, second, third, fourth, largest;

    if (a >= b) {
        if (a >= c) {
            if (a >= d) {
                if (a >= e) {
                    smallest = a;
                } else {
                    smallest = e;
                }
            } else {
                if (d >= e) {
                    smallest = d;
                } else {
                    smallest = e;
                }
            }
        } else {
            if (c >= d) {
                if (c >= e) {
                    smallest = c;
                } else {
                    smallest = e;
                }
            } else {
                if (d >= e) {
                    smallest = d;
                } else {
                    smallest = e;
                }
            }
        }
    } else {
        if (b >= c) {
            if (b >= d) {
                if (b >= e) {
                    smallest = b;
                } else {
                    smallest = e;
                }
            } else {
                if (d >= e) {
                    smallest = d;
                } else {
                    smallest = e;
                }
            }
        } else {
            if (c >= d) {
                if (c >= e) {
                    smallest = c;
                } else {
                    smallest = e;
                }
            } else {
                if (d >= e) {
                    smallest = d;
                } else {
                    smallest = e;
                }
            }
        }
    }

    if (a <= b) {
        if (a <= c) {
            if (a <= d) {
                if (a <= e) {
                    largest = a;
                } else {
                    largest = e;
                }
            } else {
                if (d <= e) {
                    largest = d;
                } else {
                    largest = e;
                }
            }
        } else {
            if (c <= d) {
                if (c <= e) {
                    largest = c;
                } else {
                    largest = e;
                }
            } else {
                if (d <= e) {
                    largest = d;
                } else {
                    largest = e;
                }
            }
        }
    } else {
        if (b <= c) {
            if (b <= d) {
                if (b <= e) {
                    largest = b;
                } else {
                    largest = e;
                }
            } else {
                if (d <= e) {
                    largest = d;
                } else {
                    largest = e;
                }
            }
        } else {
            if (c <= d) {
                if (c <= e) {
                    largest = c;
                } else {
                    largest = e;
                }
            } else {
                if (d <= e) {
                    largest = d;
                } else {
                    largest = e;
                }
            }
        }
    }

    if (smallest === a) {
        if (b >= c) {
            if (b >= d) {
                if (b >= e) {
                    second = b;
                } else {
                    second = e;
                }
            } else {
                if (d >= e) {
                    second = d;
                } else {
                    second = e;
                }
            }
        } else {
            if (c >= d) {
                if (c >= e) {
                    second = c;
                } else {
                    second = e;
                }
            } else {
                if (d >= e) {
                    second = d;
                } else {
                    second = e;
                }
            }
        }
    } else if (smallest === b) {
        if (a >= c) {
            if (a >= d) {
                if (a >= e) {
                    second = a;
                } else {
                    second = e;
                }
            } else {
                if (d >= e) {
                    second = d;
                } else {
                    second = e;
                }
            }
        } else {
            if (c >= d) {
                if (c >= e) {
                    second = c;
                } else {
                    second = e;
                }
            } else {
                if (d >= e) {
                    second = d;
                } else {
                    second = e;
                }
            }
        }
    } else if (smallest === c) {
        if (a >= b) {
            if (a >= d) {
                if (a >= e) {
                    second = a;
                } else {
                    second = e;
                }
            } else {
                if (d >= e) {
                    second = d;
                } else {
                    second = e;
                }
            }
        } else {
            if (b >= d) {
                if (b >= e) {
                    second = b;
                } else {
                    second = e;
                }
            } else {
                if (d >= e) {
                    second = d;
                } else {
                    second = e;
                }
            }
        }
    } else if (smallest === d) {
        if (a >= b) {
            if (a >= c) {
                if (a >= e) {
                    second = a;
                } else {
                    second = e;
                }
            } else {
                if (c >= e) {
                    second = c;
                } else {
                    second = e;
                }
            }
        } else {
            if (b >= c) {
                if (b >= e) {
                    second = b;
                } else {
                    second = e;
                }
            } else {
                if (c >= e) {
                    second = c;
                } else {
                    second = e;
                }
            }
        }
    } else {
        if (a >= b) {
            if (a >= c) {
                if (a >= d) {
                    second = a;
                } else {
                    second = d;
                }
            } else {
                if (c >= d) {
                    second = c;
                } else {
                    second = d;
                }
            }
        } else {
            if (b >= c) {
                if (b >= d) {
                    second = b;
                } else {
                    second = d;
                }
            } else {
                if (c >= d) {
                    second = c;
                } else {
                    second = d;
                }
            }
        }
    }

    if (largest === a) {
        if (b <= c) {
            if (b <= d) {
                if (b <= e) {
                    fourth = b;
                } else {
                    fourth = e;
                }
            } else {
                if (d <= e) {
                    fourth = d;
                } else {
                    fourth = e;
                }
            }
        } else {
            if (c <= d) {
                if (c <= e) {
                    fourth = c;
                } else {
                    fourth = e;
                }
            } else {
                if (d <= e) {
                    fourth = d;
                } else {
                    fourth = e;
                }
            }
        }
    } else if (largest === b) {
        if (a <= c) {
            if (a <= d) {
                if (a <= e) {
                    fourth = a;
                } else {
                    fourth = e;
                }
            } else {
                if (d <= e) {
                    fourth = d;
                } else {
                    fourth = e;
                }
            }
        } else {
            if (c <= d) {
                if (c <= e) {
                    fourth = c;
                } else {
                    fourth = e;
                }
            } else {
                if (d <= e) {
                    fourth = d;
                } else {
                    fourth = e;
                }
            }
        }
    } else if (largest === c) {
        if (a <= b) {
            if (a <= d) {
                if (a <= e) {
                    fourth = a;
                } else {
                    fourth = e;
                }
            } else {
                if (d <= e) {
                    fourth = d;
                } else {
                    fourth = e;
                }
            }
        } else {
            if (b <= d) {
                if (b <= e) {
                    fourth = b;
                } else {
                    fourth = e;
                }
            } else {
                if (d <= e) {
                    fourth = d;
                } else {
                    fourth = e;
                }
            }
        }
    } else if (largest === d) {
        if (a <= b) {
            if (a <= c) {
                if (a <= e) {
                    fourth = a;
                } else {
                    fourth = e;
                }
            } else {
                if (c <= e) {
                    fourth = c;
                } else {
                    fourth = e;
                }
            }
        } else {
            if (b <= c) {
                if (b <= e) {
                    fourth = b;
                } else {
                    fourth = e;
                }
            } else {
                if (c <= e) {
                    fourth = c;
                } else {
                    fourth = e;
                }
            }
        }
    } else {
        if (a <= b) {
            if (a <= c) {
                if (a <= d) {
                    fourth = a;
                } else {
                    fourth = d;
                }
            } else {
                if (c <= d) {
                    fourth = c;
                } else {
                    fourth = d;
                }
            }
        } else {
            if (b <= c) {
                if (b <= d) {
                    fourth = b;
                } else {
                    fourth = d;
                }
            } else {
                if (c <= d) {
                    fourth = c;
                } else {
                    fourth = d;
                }
            }
        }
    }
    third = a + b + c + d + e - smallest - second - fourth - largest;

    console.log("Ascending Order:", smallest, second, third, fourth, largest);
    //   resultcard
} else if (choice == 7) {
    let subject1 = parseFloat(prompt("Subject 1 (out of 100)"));
let subject2 = parseFloat(prompt("Subject 2 (out of 100)"));
let subject3 = parseFloat(prompt("Subject 3 (out of 100)"));
let subject4 = parseFloat(prompt("Subject 4 (out of 100)"));
let subject5 = parseFloat(prompt("Subject 5 (out of 100)"));



if (subject1 > 100 || subject1 < 0) {
    console.log("Error");
} else {
if (subject2 > 100 || subject2 < 0) {
    alert("Errr");
} else {
if (subject3 > 100 || subject3 < 0) {
    alert("error");
} else {
if (subject4 > 100 || subject4 < 0) {
    alert("error");
} else {
if (subject5 > 100 || subject5 < 0) {
    alert("error");
} else {

let totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;

let percentage = (totalMarks / 500) * 100;

let grade1;
if (subject1 < 50) {
    grade1 = "F";
} else if (subject1 < 60) {
    grade1 = "D";
} else if (subject1 < 70) {
    grade1 = "C";
} else if (subject1 < 80) {
    grade1 = "B";
} else if (subject1 < 90) {
    grade1 = "A";
} else {
    grade1 = "A+";
}

let grade2;
if (subject2 < 50) {
    grade2 = "F";
} else if (subject2 < 60) {
    grade2 = "D";
} else if (subject2 < 70) {
    grade2 = "C";
} else if (subject2 < 80) {
    grade2 = "B";
} else if (subject2 < 90) {
    grade2 = "A";
} else {
    grade2 = "A+";
}

let grade3;
if (subject3 < 50) {
    grade3 = "F";
} else if (subject3 < 60) {
    grade3 = "D";
} else if (subject3 < 70) {
    grade3 = "C";
} else if (subject3 < 80) {
    grade3 = "B";
} else if (subject3 < 90) {
    grade3 = "A";
} else {
    grade3 = "A+";
}

let grade4;
if (subject4 < 50) {
    grade4 = "F";
} else if (subject4 < 60) {
    grade4 = "D";
} else if (subject4 < 70) {
    grade4 = "C";
} else if (subject4 < 80) {
    grade4 = "B";
} else if (subject4 < 90) {
    grade4 = "A";
} else {
    grade4 = "A+";
}


let grade5;
if (subject5 < 50) {
    grade5 = "F";
} else if (subject5 < 60) {
    grade5 = "D";
} else if (subject5 < 70) {
    grade5 = "C";
} else if (subject5 < 80) {
    grade5 = "B";
} else if (subject5 < 90) {
    grade5 = "A";
} else {
    grade5 = "A+";
}


console.log("RESULT CARD");
console.log("Subject 1: " + subject1 ,"  Grade: " + grade1);
console.log("Subject 2: " + subject2, "  Grade: " + grade2);
console.log("Subject 3: " + subject3 ,"  Grade: " + grade3);
console.log("Subject 4: " + subject4 ,"  Grade: " + grade4);
console.log("Subject 5: " + subject5 ,"  Grade: " + grade5);
console.log("Total Marks:" + totalMarks+"/500");
console.log("Percentage: " + percentage + "%");


}
}
}
}
}



   
    
} else {
    // Invalid choice
    alert("Invalid choice! Please select 1-7");
}