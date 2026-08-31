

function sendData(event) {
    // ১. পেজ রিলোড হওয়া বন্ধ করবে
    event.preventDefault(); 
    
    // ২. ফর্মের ইনপুট থেকে সাধারণ ডেটাগুলো টেনে বের করা
    // ইউজারের দেওয়া নামটা নেওয়া হলো


    let studentName = document.getElementById('fullname').value;
    
        if (/\d/.test(studentName)) {
        alert("Numbers are not allowed in the name field. Please enter a valid name.");
        return; 
    }
    
           
    
       
    
    let board = document.getElementById('Boards').value;
    
    // রেডিও বাটন (Class) থেকে ডেটা নেওয়ার নিয়ম একটু আলাদা
    let classNode = document.querySelector('input[name="Class"]:checked');
    let className = classNode ? classNode.value : "Not Selected"; // যদি কিছু সিলেক্ট না করে, তবে "Not Selected" ধরবে

    // সব সাবজেক্টের নম্বর নেওয়া (কিছু না লিখলে 0 ধরা হবে)
        let ben = Number(document.getElementById('Ben').value) || 0;
    let eng = Number(document.getElementById('Eng').value) || 0;
    let phy = Number(document.getElementById('Phy').value) || 0;
    let math = Number(document.getElementById('Math').value) || 0;
    let chem = Number(document.getElementById('Chem').value) || 0;
    let bio = Number(document.getElementById('Bio').value) || 0;
    
       
    let optNode = document.querySelector('input[name="ops"]:checked');
    let chosenOptional = optNode ? optNode.value : "Biology"; // যদি কিছু সিলেক্ট না করে, তবে বায়োলজি ধরবে
    
    
   

    // অবজেক্ট তৈরি
    let studentResult = {
        name: studentName,
        className: className,
        board: board,
        chosenOptional: chosenOptional,
        marks: {
            Bengali: ben,
            English: eng,
            Physics: phy,
            Mathematics: math,
            Chemistry: chem,
            Biology: bio
        }
    
        };

    // ৪. ব্রাউজারের Local Storage-এ ডেটা সেভ করা (যাতে অন্য পেজ থেকে এটা খুঁজে পাওয়া যায়)
    localStorage.setItem("resultData", JSON.stringify(studentResult));

    // ৫. ডেটা সেভ হওয়ার পর অটোমেটিক রেজাল্ট পেজে চলে যাওয়া
    // (আপনার রেজাল্ট পেজের নাম যদি result.html হয়, তবে এটাই থাকবে)
    window.location.href = "result.html"; 
}
