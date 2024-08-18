import {X} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ky from "ky";
import SignupAlert from "./SignupAlert.jsx";

export default function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender , setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const [interests, setInterests] = useState([]);
  const [alert, setAlert] = useState(
    {message: "", show: false, type: ""}
  );
  let [validationUsername, setValidationUsername] = useState(false);
  let [validationPassword, setValidationPassword] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  useEffect(() => {
    ky("http://localhost:8080/api/tag")
      .json()
      .then(data => setInterests(data))
      .catch(err => console.error(err));
  }, []);
  function handleUsernameInput(event) {
    setUsername(event.target.value);
  }
  function handlePasswordInput(event) {
    setPassword(event.target.value);
  }
  function handleSelectInterest(event) {
    const selectedValue = event.target.value;
    const interest = interests.find(interest => interest.code === selectedValue);
    if (selectedValue === "0000") return;
    setSelectedInterests((prevSelectedInterests)=>{
      return [...prevSelectedInterests, interest];
    });
  }
  function handleRemoveInterest(interest) {
    setSelectedInterests((prevSelectedInterests)=>{
      return prevSelectedInterests.filter(selectedInterest => selectedInterest.code !== interest.code);
    });
  }
  function handleValidateUsername() {
    ky("http://localhost:8080/api/validate-username", {
      method: "POST",
      json: {username}
    })
      .json()
      .then(data => {
        if (!data) {
          setAlert({message: "사용 불가한 계정입니다.", show: true, type: "error"});
          setValidationUsername(false);
        } else {
          setAlert({message: "사용가능한 계정입니다.", show: true, type: "success"});
          setValidationUsername(true);
        }
      })
      .catch(err => console.error(err));
  }
  function handleConfirmPasswordInput(event) {
    setConfirmPassword(event.target.value);
    if (password !== event.target.value) {
      setAlert({message: "비밀번호가 일치하지 않습니다.", show: true, type: "error"});
      setValidationPassword(false);
    } else {
      setAlert({message: "비밀번호가 일치합니다.", show: true, type: "success"});
      setValidationPassword(true);
    }
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleNicknameInput = (event) => {
    setNickname(event.target.value);
  }
  function handleSignupComplete() {
    if (
      !validationUsername ||
      !validationPassword ||
      username === "" ||
      password === "" ||
      gender === "" ||
      nickname === "" ||
      selectedInterests.length === 0
    ) {
      return showGeneralErrorAlert();
    }
    const interestCodes = selectedInterests.map(interest => interest.code);
    ky.post("http://localhost:8080/api/signup", {
      json: {
        username,
        password,
        gender,
        nickname,
        interests: interestCodes
    }})
      .json()
      .then(() => navigate("/signup/complete"))
      .catch(err => console.error(err));
  }
  function showGeneralErrorAlert() {
    setAlert({message: "입력값을 확인해주세요.", show: true, type: "error"});
  }
  function disableAlert() {
    setAlert((prevState)=> ({...prevState, show: false}));
  }
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">회원가입</h2>
      {alert.show && <SignupAlert message={alert.message} type={alert.type}/>}
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">아이디</span>
        </div>
        <div className="flex">
          <input type="text" placeholder="Username" value={username} onClick={disableAlert} onChange={handleUsernameInput} className="input input-bordered w-full max-w-xs"/>
          <button className="btn btn-md ml-2" onClick={handleValidateUsername}>중복확인</button>
        </div>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">비밀번호</span>
        </div>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordInput} className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">비밀번호 재확인</span>
        </div>
        <input type="password" placeholder="Confirm Password" onBlur={disableAlert} value={confirmPassword} onChange={handleConfirmPasswordInput} className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">닉네임</span>
        </div>
        <input type="text" placeholder="Nickname" value={nickname} onChange={handleNicknameInput} className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">성별</span>
        </div>
        <div>
          <div className="flex">
            <label className="label cursor-pointer gap-x-2">
              <span className="label-text">남자</span>
              <input
                type="radio"
                value="MALE"
                name="gender"
                className="radio radio-primary"
                checked={gender === "MALE"}
                onChange={handleGenderChange}
              />
            </label>
            <label className="label cursor-pointer gap-x-2">
              <span className="label-text">여자</span>
              <input
                type="radio"
                value="FEMALE"
                name="gender"
                className="radio radio-error"
                checked={gender === "FEMALE"}
                onChange={handleGenderChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="label">
          <span className="label-text font-semibold">관심사</span>
        </div>
        <select className="select select-bordered select-md w-full mb-4" name="interest"
                onChange={handleSelectInterest} defaultValue="0000">
          <option value="0000" disabled={true}>관심사</option>
          {
            interests.map(interest => (
              <option key={interest.code} value={interest.code}>{interest.name}</option>
            ))
          }
        </select>
        <div className="flex flex-wrap gap-2">
          {
            selectedInterests.map(interest => (
              <button key={interest.code} className="badge active:scale-95 badge-ghost" onClick={()=>handleRemoveInterest(interest)}>
                <span>{interest.name}</span>
                <X className="text-lg"/>
              </button>
            ))
          }
        </div>
      </div>
      <button onClick={handleSignupComplete} className="btn btn-wide btn-primary mx-auto block mb-4">회원가입</button>
    </section>
  )
}