document.addEventListener("DOMContentLoaded", ()=>{
    let savedData = localStorage.getItem("resultData");
    if(savedData) {let studentData = JSON.parse(savedData);
        document.getElementById("resName").textContent = studentData.name;
        document.getElementById("resClass").textContent = studentData.className;
        document.getElementById("resBoard").textContent = studentData.board;

document.getElementById("res-ben-marks").textContent = studentData.marks.Bengali;
document.getElementById("res-eng-marks").textContent = studentData.marks.English;

let electives = [
    { name: "Physics", marks: studentData.marks.Physics },
    { name: "Chemistry", marks: studentData.marks.Chemistry },
    { name: "Mathematics", marks: studentData.marks.Mathematics },
    { name: "Biology", marks: studentData.marks.Biology }
];
//upper value to lower value

electives.sort((a, b) => {
    // ১. যদি দুজনের নম্বর আলাদা হয়, তবে যার নম্বর বেশি সে ওপরে থাকবে
    if (b.marks !== a.marks) {
        return b.marks - a.marks; 
    } 
    // ২. যদি নম্বর সমান হয় (টাই হয়), তবে অপশনাল সাবজেক্টকে নিচে পাঠাও
    else {
        if (a.name === studentData.chosenOptional) return 1;  // a-কে নিচে পাঠাও
        if (b.name === studentData.chosenOptional) return -1; // b-কে নিচে পাঠাও
        return 0; // তা না হলে যা আছে তাই থাক
    }
});




document.getElementById("res-sub1-name").textContent = electives[0].name;

document.getElementById("res-sub1-marks").textContent = electives[0].marks;


document.getElementById("res-sub2-name").textContent = electives[1].name;
document.getElementById("res-sub2-marks").textContent = electives[1].marks;


document.getElementById("res-sub3-name").textContent = electives[2].name;
document.getElementById("res-sub3-marks").textContent =electives[2].marks ;


document.getElementById("res-opt-name").textContent = electives[3].name;
document.getElementById("res-opt-marks").textContent = electives[3].marks;






function getGradeDetails(mark) {
    if (mark >= 90) return { grade: "A+", remark: "Outstanding" };
    if (mark >= 80) return { grade: "A", remark: "Excellent" };
    if (mark >= 60) return { grade: "B+",  remark: "Very Good" };
    if (mark >= 45) return { grade: "B",  remark: "Good" };
    if (mark >= 25) return { grade: "C",  remark: "Pass" };
    return { grade: "D", remark: "Fail" };
}


let benMarks = studentData.marks.Bengali;
let benDetails = getGradeDetails(benMarks);
document.getElementById("res-ben-marks").textContent = benMarks;
document.getElementById("res-ben-percent").textContent = benMarks + "%"; 
document.getElementById("res-ben-grade").textContent = benDetails.grade;
document.getElementById("res-ben-remarks").textContent = benDetails.remark;


let engMarks = studentData.marks.English;
let engDetails = getGradeDetails(engMarks);
document.getElementById("res-eng-marks").textContent = engMarks;
document.getElementById("res-eng-percent").textContent = engMarks + "%";
document.getElementById("res-eng-grade").textContent = engDetails.grade;
document.getElementById("res-eng-remarks").textContent = engDetails.remark;


let sub1Details = getGradeDetails(electives[0].marks);
document.getElementById("res-sub1-name").textContent = electives[0].name;
document.getElementById("res-sub1-marks").textContent = electives[0].marks;
document.getElementById("res-sub1-percent").textContent = electives[0].marks + "%";
document.getElementById("res-sub1-grade").textContent = sub1Details.grade;
document.getElementById("res-sub1-remarks").textContent = sub1Details.remark;


let sub2Details = getGradeDetails(electives[1].marks);
document.getElementById("res-sub2-name").textContent = electives[1].name;
document.getElementById("res-sub2-marks").textContent = electives[1].marks;
document.getElementById("res-sub2-percent").textContent = electives[1].marks + "%";
document.getElementById("res-sub2-grade").textContent = sub2Details.grade;
document.getElementById("res-sub2-remarks").textContent = sub2Details.remark;


let sub3Details = getGradeDetails(electives[2].marks);
document.getElementById("res-sub3-name").textContent = electives[2].name;
document.getElementById("res-sub3-marks").textContent = electives[2].marks;
document.getElementById("res-sub3-percent").textContent = electives[2].marks + "%";
document.getElementById("res-sub3-grade").textContent = sub3Details.grade;
document.getElementById("res-sub3-remarks").textContent = sub3Details.remark;


let optDetails = getGradeDetails(electives[3].marks);
document.getElementById("res-opt-name").textContent = electives[3].name;
document.getElementById("res-opt-marks").textContent = electives[3].marks;
document.getElementById("res-opt-percent").textContent = electives[3].marks + "%";
document.getElementById("res-opt-grade").textContent = optDetails.grade;
document.getElementById("res-opt-remarks").textContent = optDetails.remark;





let totalMarks = studentData.marks.Bengali + 
                 studentData.marks.English + 
                 electives[0].marks + 
                 electives[1].marks + 
                 electives[2].marks;

let overallPercentage = (totalMarks / 500) * 100;


let finalResult = getGradeDetails(overallPercentage);



document.getElementById("resTotalMarks").textContent = totalMarks + " / 500";
document.getElementById("resPercentage").textContent = overallPercentage.toFixed(2) + "%"; 
document.getElementById("resFinalGrade").textContent = finalResult.grade;
document.getElementById("resFinalRemarks").textContent = finalResult.remark;


document.getElementById("resOptionalSub").textContent = electives[3].name;


document.getElementById("downloadBtn").addEventListener("click", function() {
    window.print(); // ব্রাউজারের নিজস্ব অরিজিনাল PDF/Print সিস্টেম
});


// ==========================================
// ১১. Circular Progress Bar (ছবির মতো গোল রিং)
// ==========================================
let ctx = document.getElementById('myPieChart').getContext('2d');

// overallPercentage আমাদের আগেই বের করা আছে, তাই বাকিটা কত সেটা বের করছি
let remaining = 100 - overallPercentage;

new Chart(ctx, {
    type: 'doughnut', // এটা রিং-এর মতো আকার দেয়
    data: {
        datasets: [{
            data: [overallPercentage, remaining],
            backgroundColor: [
                '#108f2b', // আপনার ছবির মতো সোনালী/সর্ষে রঙ (পাওয়া নম্বর)
                '#e6e6e6'  // ফাঁকা অংশের জন্য হালকা ধূসর রঙ
            ],
            borderWidth: 0,
            cutout: '80%', // রিং-টা কতটা পাতলা বা মোটা হবে (80% মানে বেশ পাতলা)
            borderRadius: 20 // রিং-এর প্রান্তগুলো গোল (rounded) করার জন্য
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }, // সাবজেক্টের নাম হাইড করা
            tooltip: { enabled: false } // হোভার করলে পপআপ আসবে না
        }
    },
    // এই প্লাগিনটা রিং-এর ঠিক মাঝখানে আপনার ছবির মতো পার্সেন্টেজ টেক্সট বসাবে
    plugins: [{
        id: 'textCenter',
        beforeDraw: function(chart) {
            let width = chart.width,
                height = chart.height,
                ctx = chart.ctx;

            ctx.restore();
            // মাঝখানের বড় পার্সেন্টেজ লেখা
            ctx.font = "bold 35px sans-serif";
            ctx.fillStyle = "#000000";
            ctx.textBaseline = "middle";

            let text = overallPercentage.toFixed(1) + "%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2 - 10; // একটু ওপরে রাখা হলো

            ctx.fillText(text, textX, textY);

            // পার্সেন্টেজের নিচে 'BEST-5' লেখা
            ctx.font = "bold 14px sans-serif";
            ctx.fillStyle = "#888888";
            let text2 = "BEST-5",
                text2X = Math.round((width - ctx.measureText(text2).width) / 2),
                text2Y = height / 2 + 20; // একটু নিচে রাখা হলো
            
            ctx.fillText(text2, text2X, text2Y);
            ctx.save();
        }
    }]
});

// ==========================================
// ১২. সাবজেক্টের লম্বা প্রগ্রেস বার (Horizontal Bars)
// ==========================================
let barsContainer = document.getElementById('subjectBars');

// টপ ৫ সাবজেক্টের একটা লিস্ট বানাচ্ছি (যেগুলো Best of 5-এ আছে)
let top5Subjects = [
    { name: 'Bengali', marks: studentData.marks.Bengali, color: '#008080' }, // গাঢ় নীল/সবুজ
    { name: 'English', marks: studentData.marks.English, color: '#36A2EB' }, // নীল
    { name: electives[0].name, marks: electives[0].marks, color: '#FFCE56' }, // হলুদ
    { name: electives[1].name, marks: electives[1].marks, color: '#FF6384' }, // লালচে গোলাপি
    { name: electives[2].name, marks: electives[2].marks, color: '#9966FF' }  // বেগুনি
];

let barsHTML = "";

// লুপ চালিয়ে প্রতিটা সাবজেক্টের জন্য HTML তৈরি করা
top5Subjects.forEach(sub => {
    barsHTML += `
    <div style="margin-bottom: 20px;">
        <!-- সাবজেক্টের নাম এবং নম্বর -->
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #444;">
            <span>${sub.name}</span>
            <span>${sub.marks}</span>
        </div>
        <!-- ব্যাকগ্রাউন্ড লাইন (হালকা ধূসর) -->
        <div style="width: 100%; height: 12px; background-color: #e6e6e6; border-radius: 10px; overflow: hidden;">
            <!-- আসল প্রগ্রেস লাইন (রঙিন) -->
            <div style="width: ${sub.marks}%; height: 100%; background-color: ${sub.color}; border-radius: 10px;"></div>
        </div>
    </div>
    `;
});

// তৈরি করা বারগুলো HTML-এ পাঠিয়ে দেওয়া
barsContainer.innerHTML = barsHTML;



    }else { alert("Data missing! Redirecting to the form page...");
    window.location.href ="index.html";
    
    
        
    }
    
    
    
});