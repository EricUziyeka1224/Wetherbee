import Constants from 'expo-constants';
import AsyncStorage from 'react-native';
import React from 'react';
const url = 'Wetherbee-Backend-dev.us-east-2.elasticbeanstalk.com'

//Constants.platform.ios.model != 'Simulator' ? 'Brendons-MacBook-Pro.local' : 'localhost'
var hasToken = false;

function signUp(updateResponse, fullName, schoolName, phoneNumber, password,  email, grade, act, sat, psat) {
    //INSERT INTO `Wetherbee`.`USERS` (`ID`, `FIRST_NAME`, `LAST_NAME`, `SCHOOL_NAME`, `PHONE_NUMBER`, `EMAIL`, `GRADE`, `PASSWORD`, `ACT_EXAM`, `SAT_EXAM`, `PSAT_EXAM`, `ALLOW_PARENTS`, `IMAGE`) VALUES ('1', 'Brendon', 'Brendon', 'abc', 'abc', 'abc', 'abc', 'abc', 'abc', 'abc', 'abc', 'abc', 'abc')

    var firstName = fullName.split(" ")[0]
    var lastname = fullName.split(" ")[1]
    
    let phoneNum = phoneNumber.replace(/[-+()\s]/g, '')


    fetch('http://'+url+'/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FIRST_NAME: firstName,
        LAST_NAME: lastname,
        SCHOOL_NAME: schoolName,
        PHONE_NUMBER: phoneNum,
        PASSWORD: password,
        EMAIL: email,
        GRADE: grade,
        ACT_EXAM: act ? 1 : 0,
        SAT_EXAM: sat ? 1 : 0,
        PSAT_EXAM: psat ? 1 : 0,
        ALLOW_PARENTS: 0,
        IMAGE: '',
        USERNAME: '',
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
        updateResponse(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

function logIn(updateLogin, phoneNumber, password) {
    let phoneNum = phoneNumber.replace(/[-+()\s]/g, '')
    console.log(phoneNum +' '+ password)

    fetch('http://'+url+'/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        PHONE_NUMBER: phoneNum,
        PASSWORD: password,
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
        updateLogin(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

UserRegistrationFunction = (fullName, schoolName, phoneNumber, email, grade, act, sat, psat, allowParents, image, username) =>{
 
    
 
 const { UserName }  = this.state ;
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;
 
 
 
fetch('https://reactnativecode.000webhostapp.com/user_registration.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    name: UserName,
 
    email: UserEmail,
 
    password: UserPassword
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
 
// Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }

function fetchQuestions(token, updateQuestions, termId) {
       fetch('http://'+url+'/protected/subjects/term?termId='+termId, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }).then((response) => response.json())
        .then((responseJson) => {
            updateQuestions(responseJson)
        }).catch((error) => {
            console.error(error);
        });
}

function fetchTerms(token, updateTerms) {
    response = ''
    fetch('http://'+url+'/protected/subjects/terms', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateTerms(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchWords(token, updateWords) {
    console.log("fetchWords: "+token)
    response = ''
    fetch('http://'+url+'/protected/home/words', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateWords(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchCourses(token, updateCourses) {
    response = ''
    fetch('http://'+url+'/protected/home/courses', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateCourses(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchPopular(token, updatePopular) {
    response = ''
    fetch('http://'+url+'/protected/home/popular', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updatePopular(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchUpcomingExams(token, updateUpcomingExams) {
    console.log('exams => ' + token);
    response = ''
    fetch('http://'+url+'/protected/home/upcomingExams', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateUpcomingExams(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}


function fetchQuestionsAnalytics(token, updateQuestionsAnalyitcs, userId) {
    response = ''
    fetch('http://'+url+'/protected/home/questions?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) =>  response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateQuestionsAnalyitcs(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}


function fetchAnswersAnalytics(token, updateAnswersAnalyitcs, userId) {
    response = ''
    fetch('http://'+url+'/protected/home/answers?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateAnswersAnalyitcs(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchCompletedTopicList(token, updateCompletedTopicList, userId) {
    response = ''
    fetch('http://'+url+'/protected/profile/completedTopicList?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateCompletedTopicList(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchPrizes(token, updatePrizes, userId) {
    response = ''
    fetch('http://'+url+'/protected/profile/prizes?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updatePrizes(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function fetchOffline(token, updateOffline, userId) {
    response = ''
    fetch('http://'+url+'/protected/profile/offline?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateOffline(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function updatePhoneNumber(token, updatePhoneNumber, phonenumber, userId) {

    let phoneNum = phonenumber.replace(/[-+()\s]/g, '');

    fetch('http://'+url+'/protected/profile/updatePhoneNumber', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        PHONE_NUMBER: phoneNum,
        USER_ID: userId,
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(response)
        updatePhoneNumber(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

function updateUsername(token, updateUsername, username, userId) {
    fetch('http://'+url+'/protected/profile/updateUsername', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        USERNAME: username,
        USER_ID: userId,
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
        updateUsername(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

function updateGrade(token, updateGrade, grade, userId) {
    fetch('http://'+url+'/protected/profile/updateGrade', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        GRADE: grade,
        USER_ID: userId,
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
                console.log("===>");

        updateGrade(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

function updatePassword(token, updatePassword, newPassword, userId, currentPassword) {
    fetch('http://'+url+'/protected/profile/updatePassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        NEW_PASSWORD: newPassword,
        USER_ID: userId,
        CURRENT_PASSWORD: currentPassword
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
        updatePassword(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

function fetchNotifications(token, updateNotifications, userId) {
    response = ''
    fetch('http://'+url+'/protected/profile/notifications?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateNotifications(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function updateReadOffline(token, updateReadOffline, userId) {
    response = ''
    fetch('http://'+url+'/protected/profile/readOffline?userId='+userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            updateReadOffline(responseJson)
      }).catch((error) => {
        console.error(error);
      });
}

function updateName(token, updateName, fullName, userId) {
    var firstName = fullName.split(" ")[0]
    var lastname = fullName.split(" ")[1]
    
    

    fetch('http://'+url+'/protected/profile/updateName', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        FIRST_NAME: firstName,
        LAST_NAME: lastname,
        USER_ID: userId
      })
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
        updateName(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}

function allowParents(token, updateAllowParents, userId) {
    fetch('http://'+url+'/protected/profile/allowParents', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        USER_ID: userId
      })
    }).then((response) => response.json())
          .then((responseJson) => {
    // Showing response message coming from server after inserting records.
        console.log(responseJson);
        updateAllowParents(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}


function updateImage(token, updateImage, imageUrl, userId) {
    fetch('http://'+url+'/protected/profile/updateImage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        IMAGE_URL: imageUrl,
        USER_ID: userId
      })
        }).then((response) => response.json())
          .then((responseJson) => {
                console.log(responseJson);
                console.log("HERE")
                updateImage(responseJson);
      }).catch((error) => {
        console.error(error);
      });
}


export default {
    signUp,
    logIn,
    fetchQuestions,
    fetchTerms,
    fetchWords,
    fetchCourses,
    fetchPopular,
    fetchUpcomingExams,
    fetchQuestionsAnalytics,
    fetchAnswersAnalytics,
    fetchCompletedTopicList,
    fetchPrizes,
    fetchOffline,
    updatePhoneNumber,
    updateUsername,
    updateGrade,
    updatePassword,
    fetchNotifications,
    updateReadOffline,
    updateName,
    allowParents,
    updateImage,
    hasToken
};

