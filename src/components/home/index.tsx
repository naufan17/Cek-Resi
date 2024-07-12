'use client'

import React, { ChangeEvent, useEffect } from 'react';
import { useState } from "react";
import Input from '@/components/common/input';
import Option from '@/components/common/option';
import Button from '@/components/common/button';
import Information from "@/components/home/information";
import Detail from "@/components/home/detail";
import History from "@/components/home/history";
import { requestGetListCourier } from '@/api/Courier';
import { requestGetTrack } from '@/api/Track';
import { SummaryData, DetailData, HistoryData } from '@/interfaces/track';
import { CourierData } from '@/interfaces/courier';

const Home: React.FC = () => {
  const [receipt, setReceipt] = useState<string>('');
  const [courier, setCourier] = useState<string>('');
  const [list, setList] = useState<CourierData[]>([]);
  const [information, setInformation] = useState<SummaryData | null>(null);
  const [detail, setDetail] = useState<DetailData | null>(null);
  const [history, setHistory] = useState<HistoryData[] | null>(null);

  useEffect(() => {
    listCourier();
  }, [])

  const listCourier = async () => {
    const result = await requestGetListCourier();
    setList(result)
  };

  const trackReceipt = async () => {
    const result = await requestGetTrack(courier, receipt);
    setInformation(result.summary);
    setDetail(result.detail);
    setHistory(result.history);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    switch (name) {
      case 'courier':
        setCourier(value);
        break;
      case 'receipt':
        setReceipt(value);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="relative bg-slate-900">
        <div className="absolute inset-x-0 bottom-0">
          <svg viewBox="0 0 224 12" fill="currentColor" className="w-full -mb-1 text-white" preserveAspectRatio="none">
            <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z"></path>
          </svg>
        </div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24">
          <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-3xl sm:text-center">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-5xl sm:leading-none">
              Cek Resi
            </h2>
            <p className="mb-6 text-sm font-thin text-gray-300 sm:text-lg">
              Lacak Barang Pengirimanmu via JNE, JNT, SiCepat, Shopee Express dll
            </p>
            <div className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
              <Input receipt={receipt} handleInputChange={handleInputChange} placeholder={'Masukkan Resi'} />
              <Option option={list} courier={courier} handleInputChange={handleInputChange} />
              <Button trackReceipt={trackReceipt} title={'Cek'} />
            </div>
          </div>
        </div>
      </div>
      {information && <Information information={information} />}
      {detail && <Detail detail={detail} />}
      {history && <History history={history} />}
    </>
  );
}

export default Home;