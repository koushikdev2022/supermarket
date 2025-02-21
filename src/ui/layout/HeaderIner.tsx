import React from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../../assets/images/images';

// import DropdownUser from '../../components/DropdownUser';
import { BiMenu } from 'react-icons/bi';
import DropdownUserJsx from '../../components/DropdownUserJsx';
import { CiLogin, FcGoogle, RiLoginBoxLine } from '../../assets/icons';
import { BiSupport } from "react-icons/bi";

import { useState } from "react";
import { Button, Modal, Label, TextInput } from "flowbite-react";

function HeaderIner(props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) {

  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <div className='z-10 sticky top-0 z-999 flex w-full bg-white shadow-md'>
      <div className='flex flex-grow items-center justify-between py-2 px-2 shadow-2 md:px-6 2xl:px-11'>
        <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls='sidebar'
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className='z-99999 block rounded-sm border border-stroke bg-white p-1 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden'
          >
            <BiMenu className='text-2xl' />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
          <Link className='block flex-shrink-0 lg:hidden' to='/'>
            <img className='w-20' src={logo} alt='Logo' />
          </Link>
        </div>

        <div className='hidden sm:block'>
          <h1 className='text-[25px] text-white font-bold pl-4 pt-0'>
            &nbsp;
          </h1>
        </div>

        <div className='flex items-center gap-3 2xsm:gap-7'>

         <ul className='flex'>
            <li><Link onClick={() => setOpenLoginModal(true)} className='font-semibold text-sm text-gray-600 ml-4 hover:text-[#5e17eb] flex items-center'><RiLoginBoxLine className='text-lg mr-1'/> Login</Link></li>
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUserJsx />
          {/* <!-- User Area --> */}


        </div>
      </div>
      {/* Login start here */}
      <Modal size="md" show={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <Modal.Header className='border-0 absolute right-0 top-0'>&nbsp;</Modal.Header>
        <Modal.Body className='login_popup'>
          <div className="space-y-6 pt-8">
            <p className='text-Black font-bold text-center text-2xl pb-4'>Log in</p>
            <div className='bg-white border border-[#8f8f8f] w-full rounded-lg text-base font-semibold'>
              <Link to="/" className='flex justify-center items-center rounded-lg py-2 hover:bg-black hover:text-white'><FcGoogle className='text-2xl mr-1'/> Continue With Google</Link>
            </div>
            <p className='text-Black font-semibold text-center pb-1'>or</p>
            <div>
              <TextInput className='mb-2' id="email1" type="email" placeholder="Email" required />
              <button className='bg-[#5e17eb] w-full text-white py-2 rounded-lg text-base font-semibold hover:bg-black' type="submit">Continue With Email</button>
            </div>
            <div className='mt-4'>
              <ul className='flex justify-center'>
                <li className='px-1'><Link className='text-[#8f8f8f] text-xs hover:text-black font-semibold text-center' to="/">Privacy</Link></li>
                <li className='px-1'><Link className='text-[#8f8f8f] text-xs hover:text-black font-semibold text-center' to="/">Terms</Link></li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* Login ends here */}
    </div>
  );
}

export default HeaderIner;
