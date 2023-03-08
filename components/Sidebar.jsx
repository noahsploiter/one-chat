import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Image from "next/future/image";
import DefaultImage from "../public/images/default.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import Card from "./Card";
import { Disclosure } from "@headlessui/react";

import {
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import CardLoader from "./CardLoader";
import ChatCard from "./ChatCard";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [user, loading] = useAuthState(auth);
  // console.log(user);

  const logout = async () => {
    if (user) {
      await setDoc(
        doc(db, "users", user?.uid),
        {
          name: user?.displayName,
          email: user?.email,
          imageURL: user?.photoURL,
          online: false,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    }
    await signOut(auth);
  };

  const usersRef = collection(db, "users");
  const [userSnapShots, loading2] = useCollection(usersRef);
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("users", "array-contains", user?.email));
  const [chatSnapShots, loading3] = useCollection(q);
  return (
    <div className="gradient h-[50px]">
      <div className="flex justify-end ml-[30px]">
        <div className="relative w-full flex items-center">
          <div className="text-xl absolute top-5 left-3">
            <AiOutlineSearch />
          </div>
          <input
            type="text "
            className="absolute h-[30px] top-3  border bg-transparent  w-[200px] px-10 py-2 rounded-full border-[#494949] outline-none focus:border-[#cd71ff]"
            placeholder="Search Here"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          {search.length > 0 && (
            <button
              className="absolute  text-2xl"
              onClick={() => {
                setSearch("");
              }}
            ></button>
          )}
          <div
            className={
              search.length > 0
                ? "w-full overflow-y-auto mt-20 transition-all"
                : "w-full h-0 overflow-y-auto mt-5 transition-all"
            }
          >
            {!loading2 ? (
              userSnapShots?.docs?.map((item) => {
                if (
                  item
                    .data()
                    .name.toLowerCase()
                    .includes(search.toLowerCase()) &&
                  item.data().name !== user?.displayName
                ) {
                  return (
                    <Card
                      key={item.id}
                      name={item.data().name}
                      imageURL={item.data().imageURL}
                      email={item.data().email}
                      id={item.id}
                      setSearch={setSearch}
                    />
                  );
                }
              })
            ) : (
              <div>
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </div>
            )}
          </div>
        </div>
        <Disclosure as="nav">
          <Disclosure.Button className="mt-[10px] inline-flex items-center peer justify-center rounded-md p-2 text-grey-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group hover:bg-gray-900">
            <GiHamburgerMenu className="black md:hidden w-6 h-6" />
          </Disclosure.Button>

          <div className="p-6 w-4/1 h-screen backdrop-blur-sm z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
            <div className="items-center w-full space-x-4">
              <div className="absolute inset-x-0 bottom-10 flex justify-center">
                <div className="w-[100px]">
                  <div className="w-[50px] h-[50px] overflow-hidden border rounded-full ml-6">
                    <Image
                      src={user?.photoURL}
                      width={50}
                      height={50}
                      priority={true}
                      quality={100}
                      alt=""
                    />
                  </div>
                  <div className="w-full text-center">
                    <h1 className="text-xl my-2">{user?.displayName}</h1>
                    <div
                      className=" text-xl bg-[#fff] w-full text-black py-1 rounded-md hover:bg-[#92929275] transition-colors hover:text-white cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full  h-screen overflow-y-auto mt-2 transition-all">
              {!loading3 ? (
                chatSnapShots?.docs?.map((chat) => {
                  return <ChatCard key={chat.id} chatData={chat} />;
                })
              ) : (
                <div>
                  <CardLoader />
                  <CardLoader />
                  <CardLoader />
                </div>
              )}
            </div>
          </div>
        </Disclosure>
      </div>
    </div>
  );
};

export default Sidebar;
