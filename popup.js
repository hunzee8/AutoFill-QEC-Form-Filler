document.getElementById("courseEvaluation").addEventListener("click", () => {
  const grade = document.getElementById("grade").value;
  sendMessageToContentScript("CourseEvaluation", grade);
});

document.getElementById("teacherEvaluation").addEventListener("click", () => {
  const grade = document.getElementById("grade").value;
  sendMessageToContentScript("TeacherEvaluation", grade);
});

document.getElementById("onlineLearningEvaluation").addEventListener("click", () => {
  const grade = document.getElementById("grade").value;
  sendMessageToContentScript("OnlineLearningEvaluation", grade);
});

function sendMessageToContentScript(action, grade) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      args: [action, grade],
      func: injectEvaluationScript,
    });
  });
}

function injectEvaluationScript(action, grade) {
  const option = parseInt(grade); // Convert grade to number
  if (action === "CourseEvaluation") {
    CourseEvaluation(option);
  } else if (action === "TeacherEvaluation") {
    TeacherEvaluation(option);
  } else if (action === "OnlineLearningEvaluation") {
    OnlineLearningEvaluation(option);
  }

  function CourseEvaluation(option) {
    const baseOpts = document.querySelector("#ctl00_ContentPlaceHolder2_cmb_courses");
    if (baseOpts.length === 1) {
      console.log("Completed. Returning to home..");
      document.querySelector("#ctl00_ContentPlaceHolder2_linkBack").click();
      return;
    }
    baseOpts.options[1].selected = true;
    const selector = "#ctl00_ContentPlaceHolder2_q{VAR}_{OPTION}";
    for (let i = 1; i <= 12; i++) {
      const curr = selector.replace("{VAR}", i).replace("{OPTION}", option);
      document.querySelector(curr).click();
    }
    document.querySelector("#ctl00_ContentPlaceHolder2_btnSave").click();
  }

  function TeacherEvaluation(option) {
    const InstructorMessage = "Good";
    const CourseMessage = "Good";
    const teacher = document.querySelector("#ctl00_ContentPlaceHolder2_ddlTeacher");
    const course = document.querySelector("#ctl00_ContentPlaceHolder2_ddlCourse");
    if (teacher.length === 0) {
      console.log("Completed. Returning to home..");
      document.querySelector("#ctl00_ContentPlaceHolder2_linkBack").click();
      return;
    }
    teacher.options[1].selected = true;
    setTimeout(() => __doPostBack('ctl00$ContentPlaceHolder2$ddlTeacher', ''), 0);
    try {
      if (course.length <= 1) course.options[0].selected = true;
    } catch {}
    const selector = "#ctl00_ContentPlaceHolder2_q{VAR}_{OPTION}";
    for (let i = 1; i <= 16; i++) {
      const curr = selector.replace("{VAR}", i).replace("{OPTION}", option);
      document.querySelector(curr).click();
    }
    document.querySelector("#ctl00_ContentPlaceHolder2_q20").textContent = InstructorMessage;
    document.querySelector("#ctl00_ContentPlaceHolder2_q21").textContent = CourseMessage;
    document.querySelector("#ctl00_ContentPlaceHolder2_btnSave").click();
  }

  function OnlineLearningEvaluation(option) {
    const InstructorMessage = "Very Good Teacher";
    const subject = document.querySelector("#ctl00_ContentPlaceHolder1_cmb_courses");
    if (subject.length <= 1) {
      console.log("Completed. Returning to home..");
      document.querySelector("#ctl00_ContentPlaceHolder1_linkBack").click();
      return;
    }
    subject.options[1].selected = true;
    setTimeout(() => __doPostBack('ctl00$ContentPlaceHolder1$cmb_courses', ''), 0);
    const selector = "#ctl00_ContentPlaceHolder1_q{VAR}_{OPTION}";
    for (let i = 1; i <= 15; i++) {
      const curr = selector.replace("{VAR}", i).replace("{OPTION}", option);
      document.querySelector(curr).click();
    }
    document.querySelector("#ctl00_ContentPlaceHolder1_q20").textContent = InstructorMessage;
    document.querySelector("#ctl00_ContentPlaceHolder1_btnSave").click();
  }
}
