import profile from '@/public/icon/profile.svg';
import camera from '@/public/icon/camera.svg';
import styles from './Modify.module.css';
import down from '@/public/icon/down.svg';
import Link from 'next/link';
import DefaultLayout from '@/app/components/DefaultLayout';

export default function Modify() {
  return (
    <>
      <DefaultLayout>
        <main className={styles['modify-div']}>
          <div className={styles['profile-top']}>
            <div className={styles['img-wrapper']}>
              <img src={profile.src} alt="프로필이미지" className={styles['profile-img']} />
              <button type="button" className={styles['btn-camera']}>
                <img src={camera.src} alt="카메라이미지" />
              </button>
            </div>

            <div className={styles['btn-div']}>
              <Link href="/mypage">
                <button type="button" className={styles['btn-cancel']}>
                  취소
                </button>
              </Link>
              <Link href="/mypage">
                <button type="button" className={styles['btn-complete']}>
                  완료
                </button>
              </Link>
            </div>
          </div>
          <div>
            <div className={styles['nickname-div']}>
              <span>닉네임</span>
              <input defaultValue="나폴리맛피자"></input>
            </div>

            <div className={styles['introduce-div']}>
              <span>소개</span>
              <textarea defaultValue="나의 소개를 쓰는 공간"></textarea>
            </div>
            <div className={styles['address-div']}>
              <div>
                <span>시 </span>
                <select name="지역" id="" className={styles['city']}>
                  <option value="">서울특별시</option>
                  <option value="">인천광역시</option>
                  <option value="">대전광역시</option>
                  <option value="">세종특별자치시</option>
                  <option value="">광주광역시</option>
                  <option value="">대구광역시</option>
                  <option value="">울산광역시</option>
                  <option value="">부산광역시</option>
                  <option value="">경기도</option>
                  <option value="">강원특별자치도</option>
                  <option value="">충청북도</option>
                  <option value="">충청남도</option>
                  <option value="">전라남도</option>
                  <option value="">전북특별자치도</option>
                  <option value="">경상남도</option>
                  <option value="">경상북도</option>
                  <option value="">제주특별자치도</option>
                </select>
                <img src={down.src} alt="화살표" />
              </div>

              <div>
                <span>구 </span>
                <select name="구" id="" className={styles['district']}>
                  <option value="">종로구</option>
                  <option value="">중구</option>
                  <option value="">용산구</option>
                  <option value="">성동구</option>
                  <option value="">광진구</option>
                  <option value="">동대문구</option>
                  <option value="">중랑구</option>
                  <option value="">성북구</option>
                  <option value="">강북구</option>
                  <option value="">도봉구</option>
                  <option value="">노원구</option>
                  <option value="">은평구</option>
                  <option value="">서대문구</option>
                  <option value="">마포구</option>
                  <option value="">양천구</option>
                  <option value="">강서구</option>
                  <option value="">구로구</option>
                  <option value="">금천구</option>
                  <option value="">영등포구</option>
                  <option value="">동작구</option>
                  <option value="">관악구</option>
                  <option value="">서초구</option>
                  <option value="">강남구</option>
                  <option value="">송파구</option>
                  <option value="">강동구</option>
                </select>
                <img src={down.src} alt="화살표" />
              </div>
            </div>

            <div className={styles['etc-div']}>
              <div>
                <span>나이</span>
                <select name="나이" id="">
                  <option value="">10대</option>
                  <option value="">20대</option>
                  <option value="">30대</option>
                  <option value="">40대 이상</option>
                </select>
                <img src={down.src} alt="화살표" />
              </div>

              <div>
                <span>성별</span>
                <select name="성별" id="">
                  <option value="">남</option>
                  <option value="">여</option>
                </select>
                <img src={down.src} alt="화살표" />
              </div>
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
}
