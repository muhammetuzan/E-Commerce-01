import React from "react";


// Kart yapısını yukarıda fonksiyon olarak tanımla
export function renderTeamCard({ image, name, role }, idx) {
  return (
    <div key={idx} className="w-[316px] h-[403px] flex flex-col items-center bg-white rounded">
      {/* Card Item - Media */}
      <div className="w-[316px] h-[231px] flex items-center justify-center bg-gray-100 rounded-t">
        <img src={image} alt={name} className="w-[316px] h-[231px] object-cover rounded-t" />
      </div>
      {/* Card Content */}
      <div className="w-[316px] h-[172px] flex flex-col items-center justify-center gap-[10px] p-[30px]">
        <h5 className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#252B42] w-[83px] h-[24px]">{name}</h5>
        <h6 className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373] w-[77px] h-[24px]">{role}</h6>
        <div className="flex items-center justify-center gap-[20px] w-[112px] h-[44px] pt-[10px] pb-[10px]">
          {/* Facebook Icon - Mobil */}
          <span className="w-[24px] h-[24px] flex items-center justify-center md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.04 0H0.96C0.429 0 0 0.429 0 0.96V23.04C0 23.571 0.429 24 0.96 24H23.04C23.571 24 24 23.571 24 23.04V0.96C24 0.429 23.571 0 23.04 0ZM20.268 7.005H18.351C16.848 7.005 16.557 7.719 16.557 8.769V11.082H20.145L19.677 14.703H16.557V24H12.816V14.706H9.687V11.082H12.816V8.412C12.816 5.313 14.709 3.624 17.475 3.624C18.801 3.624 19.938 3.723 20.271 3.768V7.005H20.268Z" fill="#335BF5"/>
            </svg>
          </span>
          {/* Facebook Icon - Desktop */}
          <span className="hidden md:flex w-[23px] h-[23px] items-center justify-center">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M23 11.5704C23 5.1801 17.8515 0 11.5014 0C5.14848 0.00143732 0 5.1801 0 11.5719C0 17.3456 4.2056 22.1319 9.70191 23V14.9151H6.78415V11.5719H9.70479V9.02062C9.70479 6.12155 11.4224 4.52037 14.0484 4.52037C15.3075 4.52037 16.6226 4.74603 16.6226 4.74603V7.59193H15.1724C13.7451 7.59193 13.2995 8.4845 13.2995 9.40008V11.5704H16.4875L15.9787 14.9136H13.2981V22.9986C18.7944 22.1304 23 17.3441 23 11.5704Z" fill="#23A6F0"/>
            </svg>
          </span>
          {/* Instagram Icon - Mobil */}
          <span className="w-[24px] h-[24px] flex items-center justify-center md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9889 5.83889C8.58389 5.83889 5.83589 8.58689 5.83589 11.9919C5.83589 15.3969 8.58389 18.1449 11.9889 18.1449C15.3939 18.1449 18.1419 15.3969 18.1419 11.9919C18.1419 8.58689 15.3939 5.83889 11.9889 5.83889ZM11.9889 15.9909C9.78689 15.9909 7.98989 14.1939 7.98989 11.9919C7.98989 9.78989 9.78689 7.99289 11.9889 7.99289C14.1909 7.99289 15.9879 9.78989 15.9879 11.9919C15.9879 14.1939 14.1909 15.9909 11.9889 15.9909ZM18.3939 4.15289C17.5989 4.15289 16.9569 4.79489 16.9569 5.58989C16.9569 6.38489 17.5989 7.02689 18.3939 7.02689C19.1889 7.02689 19.8309 6.38789 19.8309 5.58989C19.8311 5.40112 19.7941 5.21415 19.722 5.0397C19.6499 4.86524 19.544 4.70674 19.4105 4.57325C19.277 4.43977 19.1185 4.33393 18.9441 4.26179C18.7696 4.18966 18.5827 4.15265 18.3939 4.15289ZM23.9829 11.9919C23.9829 10.3359 23.9979 8.69489 23.9049 7.04189C23.8119 5.12189 23.3739 3.41789 21.9699 2.01389C20.5629 0.606892 18.8619 0.171892 16.9419 0.0788923C15.2859 -0.0141077 13.6449 0.000892333 11.9919 0.000892333C10.3359 0.000892333 8.69489 -0.0141077 7.04189 0.0788923C5.12189 0.171892 3.41789 0.609892 2.01389 2.01389C0.606892 3.42089 0.171892 5.12189 0.0788923 7.04189C-0.0141077 8.69789 0.000892332 10.3389 0.000892332 11.9919C0.000892332 13.6449 -0.0141077 15.2889 0.0788923 16.9419C0.171892 18.8619 0.609892 20.5659 2.01389 21.9699C3.42089 23.3769 5.12189 23.8119 7.04189 23.9049C8.69789 23.9979 10.3389 23.9829 11.9919 23.9829C13.6479 23.9829 15.2889 23.9979 16.9419 23.9049C18.8619 23.8119 20.5659 23.3739 21.9699 21.9699C23.3769 20.5629 23.8119 18.8619 23.9049 16.9419C24.0009 15.2889 23.9829 13.6479 23.9829 11.9919ZM21.3429 19.0659C21.1239 19.6119 20.8599 20.0199 20.4369 20.4399C20.0139 20.8629 19.6089 21.1269 19.0629 21.3459C17.4849 21.9729 13.7379 21.8319 11.9889 21.8319C10.2399 21.8319 6.48989 21.9729 4.91189 21.3489C4.36589 21.1299 3.95789 20.8659 3.53789 20.4429C3.11489 20.0199 2.85089 19.6149 2.63189 19.0689C2.00789 17.4879 2.14889 13.7409 2.14889 11.9919C2.14889 10.2429 2.00789 6.49289 2.63189 4.91489C2.85089 4.36889 3.11489 3.96089 3.53789 3.54089C3.96089 3.12089 4.36589 2.85389 4.91189 2.63489C6.48989 2.01089 10.2399 2.15189 11.9889 2.15189C13.7379 2.15189 17.4879 2.01089 19.0659 2.63489C19.6119 2.85389 20.0199 3.11789 20.4399 3.54089C20.8629 3.96389 21.1269 4.36889 21.3459 4.91489C21.9699 6.49289 21.8289 10.2429 21.8289 11.9919C21.8289 13.7409 21.9699 17.4879 21.3429 19.0659Z" fill="#E61F5A"/>
            </svg>
          </span>
          {/* Instagram Icon - Desktop */}
          <span className="hidden md:flex w-[23px] h-[23px] items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0C8.01488 0 7.6395 0.01375 6.46663 0.066C5.29375 0.121 4.49487 0.30525 3.795 0.5775C3.06088 0.853626 2.39593 1.28676 1.84663 1.84663C1.2871 2.39621 0.854023 3.06108 0.5775 3.795C0.30525 4.4935 0.119625 5.29375 0.066 6.4625C0.01375 7.63812 0 8.01213 0 11.0014C0 13.9879 0.01375 14.3619 0.066 15.5347C0.121 16.7063 0.30525 17.5051 0.5775 18.205C0.859375 18.9282 1.23475 19.5415 1.84663 20.1534C2.45713 20.7652 3.07037 21.142 3.79363 21.4225C4.49487 21.6947 5.29238 21.8804 6.46388 21.934C7.63813 21.9862 8.01213 22 11 22C13.9879 22 14.3605 21.9862 15.5347 21.934C16.7049 21.879 17.5065 21.6947 18.2064 21.4225C18.94 21.1462 19.6045 20.7131 20.1534 20.1534C20.7652 19.5415 21.1406 18.9282 21.4225 18.205C21.6934 17.5051 21.879 16.7063 21.934 15.5347C21.9862 14.3619 22 13.9879 22 11C22 8.01213 21.9862 7.63813 21.934 6.46388C21.879 5.29375 21.6934 4.4935 21.4225 3.795C21.146 3.06106 20.7129 2.39618 20.1534 1.84663C19.6042 1.28655 18.9392 0.853387 18.205 0.5775C17.5037 0.30525 16.7035 0.119625 15.5334 0.066C14.3591 0.01375 13.9865 0 10.9973 0H11.0014H11ZM10.0141 1.98275H11.0014C13.9384 1.98275 14.2863 1.99238 15.4454 2.046C16.5179 2.09413 17.1009 2.27425 17.4886 2.42412C18.0015 2.6235 18.3686 2.86275 18.7536 3.24775C19.1386 3.63275 19.3765 3.9985 19.5759 4.51275C19.7271 4.89913 19.9059 5.48213 19.954 6.55463C20.0076 7.71375 20.0186 8.06163 20.0186 10.9973C20.0186 13.9329 20.0076 14.2821 19.954 15.4412C19.9059 16.5138 19.7257 17.0954 19.5759 17.4831C19.3995 17.9607 19.118 18.3926 18.7522 18.7467C18.3672 19.1318 18.0015 19.3696 17.4873 19.569C17.1023 19.7203 16.5192 19.899 15.4454 19.9485C14.2863 20.0007 13.9384 20.0131 11.0014 20.0131C8.06438 20.0131 7.71513 20.0007 6.556 19.9485C5.4835 19.899 4.90188 19.7203 4.51412 19.569C4.03631 19.3929 3.60405 19.1119 3.24913 18.7467C2.88303 18.392 2.60112 17.9598 2.42412 17.4818C2.27425 17.0954 2.09413 16.5124 2.046 15.4399C1.99375 14.2808 1.98275 13.9329 1.98275 10.9945C1.98275 8.0575 1.99375 7.711 2.046 6.55187C2.0955 5.47937 2.27425 4.89638 2.4255 4.50863C2.62488 3.99575 2.86412 3.62862 3.24913 3.24362C3.63412 2.85862 3.99988 2.62075 4.51412 2.42138C4.90188 2.27013 5.4835 2.09138 6.556 2.04188C7.57075 1.99513 7.964 1.98138 10.0141 1.98V1.98275ZM16.8726 3.80875C16.6993 3.80875 16.5276 3.84289 16.3675 3.90923C16.2073 3.97557 16.0618 4.0728 15.9392 4.19537C15.8167 4.31794 15.7194 4.46346 15.6531 4.62361C15.5868 4.78376 15.5526 4.95541 15.5526 5.12875C15.5526 5.30209 15.5868 5.47374 15.6531 5.63389C15.7194 5.79404 15.8167 5.93956 15.9392 6.06213C16.0618 6.1847 16.2073 6.28193 16.3675 6.34827C16.5276 6.41461 16.6993 6.44875 16.8726 6.44875C17.2227 6.44875 17.5585 6.30968 17.806 6.06213C18.0536 5.81458 18.1926 5.47884 18.1926 5.12875C18.1926 4.77866 18.0536 4.44292 17.806 4.19537C17.5585 3.94782 17.2227 3.80875 16.8726 3.80875ZM11.0014 5.3515C10.2521 5.33981 9.50798 5.47729 8.81234 5.75594C8.11671 6.0346 7.48346 6.44885 6.94946 6.97458C6.41546 7.50032 5.99138 8.12703 5.70191 8.81823C5.41244 9.50944 5.26336 10.2513 5.26336 11.0007C5.26336 11.7501 5.41244 12.4919 5.70191 13.1831C5.99138 13.8743 6.41546 14.5011 6.94946 15.0268C7.48346 15.5525 8.11671 15.9668 8.81234 16.2454C9.50798 16.5241 10.2521 16.6616 11.0014 16.6499C12.4844 16.6267 13.8988 16.0214 14.9393 14.9645C15.9799 13.9076 16.5631 12.4839 16.5631 11.0007C16.5631 9.51751 15.9799 8.09382 14.9393 7.03691C13.8988 5.97999 12.4844 5.37464 11.0014 5.3515ZM11.0014 7.33288C11.974 7.33288 12.9067 7.71923 13.5944 8.40695C14.2821 9.09467 14.6685 10.0274 14.6685 11C14.6685 11.9726 14.2821 12.9053 13.5944 13.593C12.9067 14.2808 11.974 14.6671 11.0014 14.6671C10.0288 14.6671 9.09605 14.2808 8.40833 13.593C7.72061 12.9053 7.33425 11.9726 7.33425 11C7.33425 10.0274 7.72061 9.09467 8.40833 8.40695C9.09605 7.71923 10.0288 7.33288 11.0014 7.33288Z" fill="#23A6F0"/>
</svg>

          </span>
          {/* Twitter Icon - Mobil ve Desktop aynı kalıyor */}
          <span className="w-[24px] h-[20px] flex items-center justify-center">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.9741 2.3478C23.0924 2.73374 22.133 3.0115 21.1448 3.11968C22.1708 2.50111 22.9391 1.52388 23.3056 0.371331C22.3428 0.952545 21.2881 1.3601 20.1882 1.57592C19.7285 1.07721 19.1725 0.679905 18.5549 0.408777C17.9373 0.137649 17.2712 -0.00149634 16.5983 1.21348e-05C13.8756 1.21348e-05 11.6859 2.23962 11.6859 4.98797C11.6859 5.3739 11.732 5.75984 11.807 6.13116C7.73013 5.9148 4.09412 3.93833 1.67683 0.912229C1.23637 1.67567 1.00556 2.54494 1.0084 3.4296C1.0084 5.16047 1.87563 6.68668 3.19808 7.58427C2.41874 7.55313 1.65765 7.33575 0.97671 6.94982V7.01122C0.97671 9.43502 2.66507 11.4437 4.91524 11.9056C4.49275 12.017 4.05812 12.0739 3.62161 12.0752C3.3018 12.0752 2.99928 12.043 2.69388 11.9992C3.3162 13.9756 5.12845 15.4112 7.28643 15.458C5.59808 16.8 3.48331 17.5894 1.18703 17.5894C0.77503 17.5894 0.394718 17.5748 0 17.528C2.17815 18.9461 4.76254 19.7647 7.54573 19.7647C16.581 19.7647 21.5251 12.1687 21.5251 5.57564C21.5251 5.35928 21.5251 5.14293 21.5107 4.92657C22.4672 4.21609 23.3056 3.33604 23.9741 2.3478Z" fill="#21A6DF"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
import hero1 from "../assets/team-heropicture/e98c6914973e6a41dfef7ffabf70f468edcc4107.jpg";
import hero2 from "../assets/team-heropicture/5c2a4592b5f3cb754566bde7b62ef5da4222383b.jpg";
import hero3 from "../assets/team-heropicture/4ead0629924f04ede9b2a5224dec41b501dbaa4c.jpg";
import hero4 from "../assets/team-heropicture/147ec7b917b3032e65f4538f6803ef11e8c0e09c.jpg";
import hero5 from "../assets/team-heropicture/12516b52a12de21bbd956c34ab16e5b1e48eeefe.jpg";
import team1 from "../assets/ourteam/14788f70a6747b5e74aa8fc67a9e46c99f77543b.jpg";
import team2 from "../assets/ourteam/98e76ada179d14c5b5b80c9862a7cf5f8bdf6437.jpg";
import team3 from "../assets/ourteam/ca3428bbb53263f3cb265f6e0a1129f5afc25e74.jpg";
import team4 from "../assets/ourteam/24a6b8d9efd1b9c2401fb0702dc41f18a42ed89c.jpg";
import team5 from "../assets/ourteam/ded65d448bb85dbe4a56197785c542fd6e7e057f.jpg";
import team6 from "../assets/ourteam/0a05d6ce0fd1eeff9355b162a7e7c01605dd3c55.jpg";
import team7 from "../assets/ourteam/54268cf04ad0f612e9f8f311e9d1c6bbd31a03f3.jpg";
import team8 from "../assets/ourteam/7e902282946c71109661dfcd96fe9458abbd0e5b.jpg";
import team9 from "../assets/ourteam/139086e5ca1b2a889adad8205d13222ab4105506.jpg";

const TeamPage = () => (
  <div className="w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
    {/* What We Do */}
    <div className="bg-white/50 rounded-xl mt-4 flex items-center justify-center w-[414px] h-[330px] md:w-[1440px] md:h-[280px]">
      {/*row */}  
      <div
        className="flex flex-col items-center justify-center gap-[30px] w-[414px] h-[200px] md:w-[870px] md:h-[280px] md:py-[50px] md:flex-row">
            <div
        className="flex flex-col items-center justify-center gap-[30px] w-[414px] h-[200px] md:w-[870px] md:h-[280px] md:py-[50px] md:flex-col"
        style={{opacity: 1}}
      >
        <h5 className="font-montserrat font-bold text-[16px] leading-[24px] tracking-[0.1px] text-center text-[#737373]">WHAT WE DO</h5>
        <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42]">Innovation<br className="md:hidden" /> tailored for you</h2>
        <div className="flex items-center justify-center gap-[15px] w-[120px] h-[44px] pt-[10px] pb-[10px] opacity-100">
          {/* Breadcrumb örneği */}
          <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#252B42] w-[43px] h-[24px]">Home</span>
          <span className="flex items-center">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2874_4365)">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 11.196L5.35926 6L0 0.804L0.827826 0L7 6.003L0.827826 12L0 11.196Z" fill="#BDBDBD"/>
              </g>
              <defs>
                <clipPath id="clip0_2874_4365">
                  <rect width="7" height="12" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </span>
          <span className="font-montserrat font-bold text-[14px] leading-[24px] tracking-[0.2px] text-center text-[#737373] w-[40px] h-[24px]">Team</span>
        </div>
        </div>
      </div>
    </div>
    {/* Hero Picture Section */}
    <div className="bg-white w-[413px] h-[1070px] md:w-[1440px] md:h-[530px] flex flex-col items-center justify-center mt-8">
      {/* Hero Picture Images - Responsive Layout */}
      <div className="flex flex-col md:flex-row w-full h-full items-center md:items-stretch justify-center md:gap-[10px]">
        {/* 1. büyük resim */}
        <img
          src={hero1}
          alt="Hero 1"
          className="w-[413px] h-[530px] md:w-[700px] md:h-[530px] object-cover rounded mb-2 md:mb-0 md:rounded-l"
        />
        {/* Sağdaki resimler: 2-3 ve 4-5 */}
        <div className="flex flex-col md:flex-row w-full md:w-[722px] md:gap-[10px]">
          {/* 2 ve 3 */}
          <div className="flex flex-row md:flex-col w-full md:w-[361px] gap-[5px] md:gap-[10px] mb-[10px] md:mb-0">
            <img
              src={hero2}
              alt="Hero 2"
              className="w-[204px] h-[260px] md:w-[361px] md:h-[260px] object-cover rounded scale-x-[-1] md:rounded-t"
            />
            <img
              src={hero3}
              alt="Hero 3"
              className="w-[204px] h-[260px] md:w-[361px] md:h-[260px] object-cover rounded md:rounded-b"
            />
          </div>
          {/* 4 ve 5 */}
          <div className="flex flex-row md:flex-col w-full md:w-[361px] gap-[5px] md:gap-[10px]">
            <img
              src={hero4}
              alt="Hero 4"
              className="w-[204px] h-[260px] md:w-[361px] md:h-[260px] object-cover rounded md:rounded-t"
            />
            <img
              src={hero5}
              alt="Hero 5"
              className="w-[204px] h-[260px] md:w-[361px] md:h-[260px] object-cover rounded scale-x-[-1] md:rounded-b"
            />
          </div>
        </div>
      </div>
    </div>
      {/* Meet Our Team Section */}
      <div className="w-[414px] h-[4180px] md:w-[1440px] md:h-[1759px] bg-white flex flex-col items-center mx-auto mt-8">
        {/* Üst Container: Sadece mobilde görünür */}
        <div className="w-[361px] h-[190px] pt-[45px] pb-[45px] flex flex-col items-center justify-center md:hidden">
          <div className="w-[310px] h-[100px] flex items-center justify-center mx-auto">
            <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42]">Meet Our Team</h2>
          </div>
        </div>
        {/* Alt Container: Mobilde başlık hidden, desktopta başlık görünür, desktop ölçüleri güncellendi */}
        <div className="w-[329px] h-[3867px] flex flex-col items-center gap-[30px] mx-auto
          md:w-[1050px] md:h-[1759px] md:flex md:flex-col md:gap-[112px] md:items-center md:mx-auto">
          {/* Desktop: başlık ve 3 satır kart, gap ile eşit aralıklı */}
          <div className="hidden md:flex md:flex-col md:gap-[112px] md:w-full md:h-full md:items-center md:justify-center">
            {/* Başlık */}
            <div className="md:w-[607px] md:h-[50px] md:flex md:items-center md:justify-center mx-auto">
              <h2 className="font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px] text-center text-[#252B42]">Meet Our Team</h2>
            </div>
            {/* 3 satır kart */}
            <div className="md:w-[1034px] md:h-[383px] md:flex md:flex-row md:gap-[30px] md:justify-center md:items-center">
              {[{ image: team1, name: "Username", role: "Profession" },
                { image: team2, name: "Username", role: "Profession" },
                { image: team3, name: "Username", role: "Profession" }].map(renderTeamCard)}
            </div>
            <div className="md:w-[1034px] md:h-[383px] md:flex md:flex-row md:gap-[30px] md:justify-center md:items-center">
              {[{ image: team4, name: "Username", role: "Profession" },
                { image: team5, name: "Username", role: "Profession" },
                { image: team6, name: "Username", role: "Profession" }].map(renderTeamCard)}
            </div>
            <div className="md:w-[1034px] md:h-[383px] md:flex md:flex-row md:gap-[30px] md:justify-center md:items-center">
              {[{ image: team7, name: "Username", role: "Profession" },
                { image: team8, name: "Username", role: "Profession" },
                { image: team9, name: "Username", role: "Profession" }].map(renderTeamCard)}
            </div>
          </div>
          {/* Mobilde eski yapı korunur */}
          <div className="md:hidden w-[329px] flex flex-col gap-[30px] items-center mx-auto">
            {[ 
              { image: team1, name: "Username", role: "Profession" },
              { image: team2, name: "Username", role: "Profession" },
              { image: team3, name: "Username", role: "Profession" },
              { image: team4, name: "Username", role: "Profession" },
              { image: team5, name: "Username", role: "Profession" },
              { image: team6, name: "Username", role: "Profession" },
              { image: team7, name: "Username", role: "Profession" },
              { image: team2, name: "Username", role: "Profession" },
              { image: team3, name: "Username", role: "Profession" }
            ].map(renderTeamCard)}
          </div>
        </div>
      </div>
      {/* TEAM CTA BÖLÜMÜ - doğrudan JSX olarak eklenmiştir */}
    <section className="w-[414px] h-[586px] flex flex-col items-center justify-center bg-white mx-auto md:w-[1440px] md:h-[442px]">
    <div className="w-[332px] h-[576px] flex flex-col items-center justify-center mx-auto md:w-[1050px] md:h-[442px] md:gap-[96px] md:pt-[80px] md:pb-[80px] md:items-center md:justify-center md:mx-auto" >
      <div className="w-[332px] h-[352px] flex flex-col items-center justify-center mx-auto md:w-[607px] md:h-[282px] md:mx-auto md:items-center md:justify-center">
        <div className="w-[332px] h-[352px] flex flex-col items-center justify-center gap-[30px] md:w-[547px] md:h-[282px] md:gap-[30px]">
          <h2 className="w-[332px] h-[100px] font-montserrat font-bold text-[38px] leading-[48px] tracking-[0.2px] text-center text-[#252B42] whitespace-nowrap md:w-[547px] md:h-[50px] md:text-[40px] md:leading-[50px] md:tracking-[0.2px] md:font-bold md:font-montserrat md:text-center md:text-[#252B42] md:whitespace-nowrap">Start your<span className="md:hidden"><br /></span> 14 days free trial</h2>
          <h6 className="w-[321px] h-[60px] font-montserrat font-normal text-[14px] leading-[20px] tracking-[0.2px] text-center text-[#737373] md:w-[411px] md:h-[40px] md:font-montserrat md:font-normal md:text-[14px] md:leading-[20px] md:tracking-[0.2px] md:text-center md:text-[#737373]">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.</h6>
          <button className="w-[186px] h-[52px] flex items-center justify-center gap-[10px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] rounded-[5px] bg-[#23A6F0]">
            <span className="w-[106px] h-[22px] font-montserrat font-bold text-[14px] leading-[22px] tracking-[0.2px] text-center text-white whitespace-nowrap">Try it free now</span>
          </button>
          {/* sm: Sosyal medya ikonları bölümü */}
          <div className="w-[242px] h-[50px] flex flex-row items-center justify-center gap-[34px] p-[10px] mt-[24px]">
            {/* Twitter */}
            <span className="w-[30px] h-[24px] flex items-center justify-center">
              <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 2.88609C28.8766 3.38376 27.685 3.71043 26.4649 3.85523C27.7358 3.09352 28.7116 1.8873 29.1711 0.450117C27.963 1.16705 26.6412 1.67218 25.2628 1.94367C24.14 0.747539 22.5405 0 20.7702 0C17.3711 0 14.6152 2.75578 14.6152 6.15469C14.6152 6.63715 14.6696 7.10683 14.7745 7.55742C9.6593 7.30066 5.12414 4.85039 2.0884 1.12664C1.55871 2.03566 1.2552 3.09305 1.2552 4.22086C1.2552 6.35625 2.34188 8.24004 3.99328 9.34383C3.01588 9.31322 2.05998 9.04923 1.20539 8.5739C1.20504 8.59969 1.20504 8.62547 1.20504 8.65137C1.20504 11.6334 3.3266 14.1211 6.14215 14.6865C5.2358 14.933 4.28511 14.9691 3.3627 14.792C4.14586 17.2372 6.41895 19.0166 9.11215 19.0664C7.0057 20.7171 4.35176 21.7011 1.46824 21.7011C0.971367 21.7011 0.481523 21.6719 0 21.6151C2.72379 23.3614 5.95898 24.3804 9.43477 24.3804C20.7559 24.3804 26.9466 15.0018 26.9466 6.86847C26.9466 6.60152 26.9407 6.33609 26.9288 6.07219C28.1337 5.20111 29.1737 4.1222 30 2.88609Z" fill="#55ACEE"/>
              </svg>
            </span>
            {/* Facebook */}
            <span className="w-[30px] h-[30px] flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2874_4683)">
                  <path d="M28.3443 30.0001C29.2586 30.0001 30 29.2588 30 28.3444V1.65574C30 0.741211 29.2586 0 28.3443 0H1.65574C0.741094 0 0 0.741211 0 1.65574V28.3444C0 29.2588 0.741094 30.0001 1.65574 30.0001H28.3443Z" fill="#395185"/>
                  <path d="M20.6993 30.0003V18.3827H24.5989L25.1828 13.8552H20.6993V10.9644C20.6993 9.65351 21.0634 8.76019 22.9432 8.76019L25.3407 8.75914V4.70973C24.9259 4.65453 23.5028 4.53125 21.8471 4.53125C18.3903 4.53125 16.0239 6.64121 16.0239 10.5161V13.8552H12.1143V18.3827H16.0239V30.0003H20.6993Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_2874_4683">
                    <rect width="30" height="30.0001" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
            {/* Instagram */}
            <span className="w-[30px] h-[30px] flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2874_4686)">
                  <path d="M14.9998 7.30887C10.7435 7.30887 7.30854 10.7439 7.30854 15.0001C7.30854 19.2564 10.7435 22.6914 14.9998 22.6914C19.2561 22.6914 22.6911 19.2564 22.6911 15.0001C22.6911 10.7439 19.2561 7.30887 14.9998 7.30887ZM14.9998 19.9989C12.2473 19.9989 10.001 17.7526 10.001 15.0001C10.001 12.2476 12.2473 10.0014 14.9998 10.0014C17.7523 10.0014 19.9986 12.2476 19.9986 15.0001C19.9986 17.7526 17.7523 19.9989 14.9998 19.9989ZM23.0061 5.20137C22.0123 5.20137 21.2098 6.00387 21.2098 6.99762C21.2098 7.99137 22.0123 8.79387 23.0061 8.79387C23.9998 8.79387 24.8023 7.99512 24.8023 6.99762C24.8026 6.76165 24.7563 6.52794 24.6662 6.30988C24.576 6.09181 24.4437 5.89368 24.2769 5.72682C24.11 5.55996 23.9119 5.42766 23.6938 5.3375C23.4757 5.24733 23.242 5.20107 23.0061 5.20137ZM29.9923 15.0001C29.9923 12.9301 30.0111 10.8789 29.8948 8.81262C29.7786 6.41262 29.2311 4.28262 27.4761 2.52762C25.7173 0.768869 23.5911 0.225119 21.1911 0.108869C19.1211 -0.00738074 17.0698 0.0113693 15.0035 0.0113693C12.9335 0.0113693 10.8823 -0.00738074 8.81604 0.108869C6.41604 0.225119 4.28604 0.772619 2.53104 2.52762C0.772288 4.28637 0.228537 6.41262 0.112287 8.81262C-0.00396278 10.8826 0.0147873 12.9339 0.0147873 15.0001C0.0147873 17.0664 -0.00396278 19.1214 0.112287 21.1876C0.228537 23.5876 0.776038 25.7176 2.53104 27.4726C4.28979 29.2314 6.41604 29.7751 8.81604 29.8914C10.886 30.0076 12.9373 29.9889 15.0035 29.9889C17.0735 29.9889 19.1248 30.0076 21.1911 29.8914C23.5911 29.7751 25.7211 29.2276 27.4761 27.4726C29.2348 25.7139 29.7786 23.5876 29.8948 21.1876C30.0148 19.1214 29.9923 17.0701 29.9923 15.0001ZM26.6923 23.8426C26.4186 24.5251 26.0886 25.0351 25.5598 25.5601C25.0311 26.0889 24.5248 26.4189 23.8423 26.6926C21.8698 27.4764 17.1861 27.3001 14.9998 27.3001C12.8135 27.3001 8.12604 27.4764 6.15354 26.6964C5.47104 26.4226 4.96104 26.0926 4.43604 25.5639C3.90729 25.0351 3.57729 24.5289 3.30354 23.8464C2.52354 21.8701 2.69979 17.1864 2.69979 15.0001C2.69979 12.8139 2.52354 8.12637 3.30354 6.15387C3.57729 5.47137 3.90729 4.96137 4.43604 4.43637C4.96479 3.91137 5.47104 3.57762 6.15354 3.30387C8.12604 2.52387 12.8135 2.70012 14.9998 2.70012C17.1861 2.70012 21.8736 2.52387 23.8461 3.30387C24.5286 3.57762 25.0386 3.90762 25.5636 4.43637C26.0923 4.96512 26.4223 5.47137 26.6961 6.15387C27.4761 8.12637 27.2998 12.8139 27.2998 15.0001C27.2998 17.1864 27.4761 21.8701 26.6923 23.8426Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_2874_4686">
                    <rect width="30" height="30" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
            {/* Linkedin */}
            <span className="w-[30px] h-[30px] flex items-center justify-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2874_4688)">
                  <path d="M25.5786 25.4624H21.1509V18.5282C21.1509 16.8747 21.1214 14.7461 18.848 14.7461C16.5419 14.7461 16.189 16.5477 16.189 18.4078V25.4619H11.7614V11.2024H16.0119V13.1512H16.0714C16.4968 12.4238 17.1115 11.8254 17.8501 11.4198C18.5886 11.0142 19.4233 10.8165 20.2654 10.8477C24.7531 10.8477 25.5805 13.7996 25.5805 17.6398L25.5786 25.4624ZM6.76526 9.25338C5.34615 9.25361 4.19553 8.10334 4.1953 6.68423C4.19507 5.26513 5.34522 4.11451 6.76433 4.11427C8.18343 4.11392 9.33405 5.26419 9.33429 6.6833C9.33441 7.36478 9.06382 8.0184 8.58204 8.50038C8.10025 8.98236 7.44674 9.25322 6.76526 9.25338ZM8.97919 25.4625H4.54678V11.2024H8.97907V25.4624L8.97919 25.4625ZM27.786 0.00217493H2.32187C1.11837 -0.0113659 0.131407 0.952719 0.116699 2.15622V27.7266C0.13094 28.9307 1.11779 29.8957 2.32176 29.8831H27.786C28.9926 29.898 29.9833 28.933 30 27.7266V2.15424C29.9828 0.9484 28.992 -0.0155683 27.786 0.000190493" fill="#0A66C2"/>
                </g>
                <defs>
                  <clipPath id="clip0_2874_4688">
                    <rect width="30" height="29.8833" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </div>
     </div>
    </section>
  </div>
);

export default TeamPage;
