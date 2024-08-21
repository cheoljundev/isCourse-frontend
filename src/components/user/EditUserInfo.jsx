import {X} from "react-bootstrap-icons";
import {useEffect, useState} from "react";
import ky from "ky";
import Alert from "../util/Alert.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signout} from "../redux/modules/auth.js";

export default function EditUserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [validationPassword, setValidationPassword] = useState(false);
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [nickname, setNickname] = useState("");
  const [alert, setAlert] = useState(
    {message: "", show: false, type: ""}
  );
  useEffect(() => {
    ky("http://localhost:8080/api/tag")
      .json()
      .then(data => setInterests(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    ky("http://localhost:8080/api/user/info", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .json()
      .then(data => {
        setNickname(data.nickname);
        setSelectedInterests(data.tags);
      })
      .catch(err => console.error(err));
  }, []);

  const handleNicknameInput = (event) => {
    setNickname(event.target.value);
  }

  function handleSelectInterest(event) {
    const selectedValue = event.target.value;
    const interest = interests.find(interest => interest.code === selectedValue);
    if (selectedValue === "0000") return;
    setSelectedInterests((prevSelectedInterests)=>{
      return [...new Set([...prevSelectedInterests, interest])];
    });
  }

  function handleRemoveInterest(interest) {
    setSelectedInterests((prevSelectedInterests)=>{
      return prevSelectedInterests.filter(selectedInterest => selectedInterest.code !== interest.code);
    });
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value);
    validatePassword(confirmPassword, event);
  }

  function handleConfirmPasswordInput(event) {
    setConfirmPassword(event.target.value);
    validatePassword(password, event);
  }

  function validatePassword(anotherPassword, event) {
    if (anotherPassword !== event.target.value) {
      setAlert({message: "비밀번호가 일치하지 않습니다.", show: true, type: "error"});
      setValidationPassword(false);
    } else {
      setAlert({message: "비밀번호가 일치합니다.", show: true, type: "success"});
      setValidationPassword(true);
    }
  }

  function disableAlert() {
    setAlert((prevState)=> ({...prevState, show: false}));
  }

  function handleUpdateUserInfo() {
    if (password === "") {
      return setAlert({message: "비밀번호를 입력해주세요.", show: true, type: "error"});
    }
    if (!validationPassword) {
      return setAlert({message: "비밀번호가 일치하지 않습니다.", show: true, type: "error"});
    }

    const token = localStorage.getItem("token");

    ky.patch("http://localhost:8080/api/user/info", {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: {
        password,
        nickname,
        tags: selectedInterests.map(interest => interest.code)
      }})
      .then(() => {
        setAlert({message: "정보가 수정되었습니다.", show: true, type: "success"});
      })
      .catch(err => {
        console.error(err);
        setAlert({message: "정보 수정에 실패했습니다.", show: true, type: "error"});

      });
  }

  function handleDeleteUser() {
    const token = localStorage.getItem("token");

    ky.delete("http://localhost:8080/api/user/info", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setAlert({message: "탈퇴되었습니다.", show: true, type: "success"});
        dispatch(signout());
        navigate("/");
      });
  }

  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">기본정보수정</h2>
      {alert.show && <Alert message={alert.message} type={alert.type}/>}
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
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onBlur={disableAlert} onChange={handleConfirmPasswordInput} className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">닉네임</span>
        </div>
        <input type="text" placeholder="Nickname" value={nickname} onChange={handleNicknameInput} className="input input-bordered w-full max-w-xs"/>
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
      <button className="btn btn-wide btn-primary mx-auto block mb-2" onClick={handleUpdateUserInfo}>수정완료</button>
      <button className="btn btn-error btn-wide btn-primary mx-auto block mb-4" onClick={handleDeleteUser}>탈퇴하기</button>
    </section>
  )
}