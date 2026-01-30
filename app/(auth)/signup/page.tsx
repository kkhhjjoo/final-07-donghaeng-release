'use client';

import BlankLayout from '@/app/components/BlankLayout';
import style from './signup.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    region: '',
    age: '',
    gender: '',
  });

  // 중복확인 상태 추가
  const [checkStatus, setCheckStatus] = useState({
    email: false, // 이메일 중복확인 완료 여부
    name: false, // 닉네임 중복확인 완료 여부
  });

  // 에러 상태 추가
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    region: '',
    age: '',
    gender: '',
  });

  // 성공 상태
  const [successMessages, setSuccessMessages] = useState({
    email: '',
    name: '',
  });

  const router = useRouter();
  // 이메일 중복확인
  const checkEmailDuplicate = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: '이메일을 먼저 입력해주세요.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ ...errors, email: '올바른 이메일 형식이 아닙니다.' });
      return;
    }

    try {
      // 이메일 중복확인 API 호출
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email?email=${encodeURIComponent(formData.email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
        },
      });

      const data = await res.json();

      console.log('이메일 중복확인 응답:', data);
      console.log('data.ok:', data.ok);

      if (data.ok === 1) {
        // 사용 가능한 이메일
        setCheckStatus({ ...checkStatus, email: true });
        setErrors({ ...errors, email: '' });
        setSuccessMessages({ ...successMessages, email: '중복확인 완료' });
      } else if (res.status === 409) {
        // 이미 사용중인 이메일
        setCheckStatus({ ...checkStatus, email: false });
        setErrors({ ...errors, email: '이미 존재하는 이메일입니다.' });
        setSuccessMessages({ ...successMessages, email: '' });
      }
    } catch (error) {
      console.error(error);
      alert('중복확인에 실패했습니다.');
    }
  };

  // 닉네임 중복확인
  const checkNameDuplicate = async () => {
    if (!formData.name) {
      setErrors({ ...errors, name: '닉네임을 먼저 입력해주세요.' });
      return;
    }

    if (formData.name.length < 2 || formData.name.length > 6) {
      setErrors({ ...errors, name: '닉네임은 2~6글자로 입력해주세요.' });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/name?name=${encodeURIComponent(formData.name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
        },
      });

      const data = await res.json();

      if (data.ok === 1) {
        setCheckStatus({ ...checkStatus, name: true });
        setErrors({ ...errors, name: '' });
        setSuccessMessages({ ...successMessages, name: '중복확인 완료' });
      } else if (res.status === 409) {
        setCheckStatus({ ...checkStatus, name: false });
        setErrors({ ...errors, name: '이미 존재하는 닉네임입니다.' });
        setSuccessMessages({ ...successMessages, name: '' });
      }
    } catch (error) {
      console.error(error);
      alert('중복확인에 실패했습니다.');
    }
  };

  // input 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // 해당 필드 에러 지우기
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const validateStep1 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // 이메일 검사
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
      isValid = false;
    } else if (!checkStatus.email) {
      newErrors.email = '이메일 중복확인을 해주세요.';
      isValid = false;
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8글자 이상 입력해야 합니다.';
      isValid = false;
    }

    // 비밀번호 확인 검사
    if (!formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호를 한번 더 입력해 주세요.';
      isValid = false;
    } else if (formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 2단계 유효성 검사
  const validateStep2 = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // 닉네임 검사
    if (!formData.name) {
      newErrors.name = '닉네임을 입력해주세요.';
      isValid = false;
    } else if (formData.name.length < 2 || formData.name.length > 6) {
      newErrors.name = '닉네임은 최소 2글자 ~ 최대 6글자 사이로 입력해주세요.';
      isValid = false;
    } else if (!checkStatus.name) {
      newErrors.name = '닉네임 중복확인을 해주세요.';
      isValid = false;
    }

    // 지역 검사
    if (!formData.region) {
      newErrors.region = '지역을 선택해주세요.';
      isValid = false;
    }

    // 나이 검사
    if (!formData.age) {
      newErrors.age = '나이를 선택해주세요.';
      isValid = false;
    }

    // 성별 검사
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 다음 단계로
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // 이전 단계로
  const handlePrevStep = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep(1);
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID!,
        },
        body: JSON.stringify({
          type: 'seller',
          email: formData.email,
          password: formData.password,
          name: formData.name,
          region: formData.region,
          age: Number(formData.age),
          gender: formData.gender,
        }),
      });

      const data = await res.json();

      if (data.ok === 1) {
        alert('회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        router.push('/login');
      } else {
        alert(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('일시적인 네트워크 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BlankLayout>
      <main className={style['main']}>
        <div className={style['signup-wrap']}>
          <form onSubmit={handleSubmit}>
            {/* ==================== 첫 번째 페이지 ==================== */}
            {currentStep === 1 && (
              <section className={style['signup-step']}>
                <button type="button" className={style['back-btn']} onClick={handlePrevStep} aria-label="이전페이지">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.439367 8.09227C-0.146456 8.59433 -0.146456 9.40968 0.439367 9.91175L9.43761 17.6235C10.0234 18.1255 10.9748 18.1255 11.5606 17.6235C12.1465 17.1214 12.1465 16.306 11.5606 15.804L3.62156 9L11.5559 2.19603C12.1418 1.69396 12.1418 0.878612 11.5559 0.376548C10.9701 -0.125516 10.0187 -0.125516 9.43292 0.376548L0.43468 8.08825L0.439367 8.09227Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <div className={style['logo-img']}></div>

                <fieldset className={style['email-fieldset']}>
                  <div>
                    <label className={style['label']} htmlFor="email">
                      이메일
                    </label>
                    <input className={style['input']} name="email" value={formData.email} onChange={handleChange} type="email" id="email" placeholder="이메일을 입력해 주세요" required />
                  </div>
                  <button type="button" className={style['check-btn']} onClick={checkEmailDuplicate}>
                    중복확인
                  </button>
                  {errors.email && <span className={`${style['field-message']} ${style['field-email']}`}>{errors.email}</span>}
                  {successMessages.email && <span className={`${style['ok-message']} ${style['field-email']}`}>{successMessages.email}</span>}
                </fieldset>

                <fieldset className={style['password-fieldset']}>
                  <label className={style['label']} htmlFor="password">
                    비밀번호
                  </label>
                  <input className={style['input']} name="password" value={formData.password} onChange={handleChange} type="password" id="password" placeholder="비밀번호를 입력해 주세요" required />
                  {errors.password && <span className={`${style['field-message']} ${style['field-password']}`}>{errors.password}</span>}
                </fieldset>

                <fieldset className={style['password-fieldset']}>
                  <label className={style['label']} htmlFor="password-check">
                    비밀번호 확인
                  </label>
                  <input className={style['input']} name="passwordCheck" value={formData.passwordCheck} onChange={handleChange} type="password" id="password-check" placeholder="비밀번호를 한번 더 입력해 주세요" required />
                  {errors.passwordCheck && <span className={`${style['field-message']} ${style['field-password']}`}>{errors.passwordCheck}</span>}
                </fieldset>

                <button type="button" onClick={handleNextStep} className={style['btn']}>
                  다음으로
                </button>
              </section>
            )}

            {/* ==================== 두 번째 페이지 ==================== */}
            {currentStep === 2 && (
              <section className={style['signup-step']}>
                <button type="button" className={style['back-btn']} onClick={handlePrevStep} aria-label="이전페이지">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.439367 8.09227C-0.146456 8.59433 -0.146456 9.40968 0.439367 9.91175L9.43761 17.6235C10.0234 18.1255 10.9748 18.1255 11.5606 17.6235C12.1465 17.1214 12.1465 16.306 11.5606 15.804L3.62156 9L11.5559 2.19603C12.1418 1.69396 12.1418 0.878612 11.5559 0.376548C10.9701 -0.125516 10.0187 -0.125516 9.43292 0.376548L0.43468 8.08825L0.439367 8.09227Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <div className={style['logo-img']}></div>

                <fieldset className={style['nickname-fieldset']}>
                  <div>
                    <label className={style['label']} htmlFor="nickname">
                      닉네임
                    </label>
                    <input className={style['input']} name="name" value={formData.name} onChange={handleChange} type="text" id="nickname" placeholder="닉네임을 입력해 주세요" required />
                  </div>
                  <button type="button" className={style['check-btn']} onClick={checkNameDuplicate}>
                    중복확인
                  </button>
                  {errors.name && <span className={`${style['field-message']} ${style['field-nickname']}`}>{errors.name}</span>}
                  {successMessages.name && <span className={`${style['ok-message']} ${style['field-nickname']}`}>{successMessages.name}</span>}
                </fieldset>

                <fieldset className={style['region-fieldset']}>
                  <div className={style['field-div']}>
                    <label className={style['label']} htmlFor="region">
                      지역
                    </label>
                    <br />
                    <select className={style['select']} name="region" value={formData.region} onChange={handleChange} id="region" required>
                      <option value="">지역을 선택해 주세요</option>
                      <option value="seoul">서울특별시</option>
                      <option value="busan">부산광역시</option>
                      <option value="daegu">대구광역시</option>
                      <option value="incheon">인천광역시</option>
                      <option value="gwangju">광주광역시</option>
                      <option value="daejeon">대전광역시</option>
                      <option value="ulsan">울산광역시</option>
                      <option value="sejong">세종특별자치시</option>
                      <option value="gyeonggi">경기도</option>
                      <option value="gangwon">강원특별자치도</option>
                      <option value="chungbuk">충청북도</option>
                      <option value="chungnam">충청남도</option>
                      <option value="jeonbuk">전라북도</option>
                      <option value="jeonnam">전라남도</option>
                      <option value="gyeongbuk">경상북도</option>
                      <option value="gyeongnam">경상남도</option>
                      <option value="jeju">제주특별자치도</option>
                    </select>
                  </div>
                  <svg className={style['svg-1']} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                      fill="black"
                    />
                  </svg>
                </fieldset>
                {errors.region && <span className={style['field-message']}>{errors.region}</span>}

                <div className={style['fieldset-wrap']}>
                  <fieldset className={style['age-fieldset']}>
                    <div className={style['field-div']}>
                      <label className={style['label']} htmlFor="age">
                        나이
                      </label>
                      <div>
                        <select className={style['select']} name="age" value={formData.age} onChange={handleChange} id="age" required>
                          <option value="">선택</option>
                          <option value="10">10대</option>
                          <option value="20">20대</option>
                          <option value="30">30대</option>
                          <option value="40">40대 이상</option>
                        </select>
                      </div>
                      <svg className={style['svg-2']} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </fieldset>
                  {errors.age && <span className={style['field-message']}>{errors.age}</span>}

                  <fieldset className={style['gender-fieldset']}>
                    <div className={style['field-div']}>
                      <label className={style['label']} htmlFor="gender">
                        성별
                      </label>
                      <select className={style['select']} name="gender" value={formData.gender} onChange={handleChange} id="gender" required>
                        <option value="">선택</option>
                        <option value="m">남</option>
                        <option value="f">여</option>
                      </select>
                    </div>
                    <svg className={style['svg-3']} width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.09227 11.5606C8.59433 12.1465 9.40968 12.1465 9.91175 11.5606L17.6235 2.56239C18.1255 1.97657 18.1255 1.02519 17.6235 0.439367C17.1214 -0.146456 16.306 -0.146456 15.804 0.439367L9 8.37844L2.19603 0.444053C1.69396 -0.14177 0.878612 -0.14177 0.376548 0.444053C-0.125516 1.02988 -0.125516 1.98125 0.376548 2.56708L8.08825 11.5653L8.09227 11.5606Z"
                        fill="black"
                      />
                    </svg>
                  </fieldset>
                  {errors.gender && <span className={style['field-message']}>{errors.gender}</span>}
                </div>

                <button type="submit" className={style['btn']} disabled={isSubmitting}>
                  {isSubmitting ? '가입 중...' : '회원가입'}
                </button>
              </section>
            )}
          </form>
        </div>
      </main>
    </BlankLayout>
  );
}
