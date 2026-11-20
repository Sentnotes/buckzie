import React, { useState, useEffect } from 'react';
import {
  X,
  Car,
  Navigation,
  MapPin,
  ShieldCheck,
  Star,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  Baby
} from 'lucide-react';

export default function RideSimulationModal({ isOpen, bookingData, onClose }) {
  const [stage, setStage] = useState('searching');

  useEffect(() => {
    if (isOpen) {
      setStage('searching');
      const timer = setTimeout(() => {
        setStage('matched');
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const rideType = bookingData?.rideType || {
    name: 'BuckledIn Comfort',
    price: '$24.50',
    eta: '4 min',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-black hover:text-brand-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {stage === 'searching' && (
          <div className="py-8 text-center space-y-6">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping" />
              <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white shadow-xl relative z-10">
                <Car className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-black">
                Connecting You with Nearby Drivers...
              </h3>
              <p className="text-xs sm:text-sm text-black font-medium max-w-xs mx-auto">
                Finding the highest-rated driver with sanitized seats & zero surge pricing.
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs text-black font-semibold space-y-1 text-left max-w-xs mx-auto shadow-sm">
              <div className="flex items-center space-x-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <span>Trip Details:</span>
              </div>
              <div className="truncate">From: {bookingData?.pickup || 'Current Location'}</div>
              <div className="truncate">To: {bookingData?.destination || 'Metropolitan Arts Center'}</div>
              <div className="font-bold text-brand-600">Estimated: {rideType.price}</div>
            </div>
          </div>
        )}

        {stage === 'matched' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Header Status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-extrabold text-black uppercase tracking-wide">
                  Driver En Route ({rideType.eta || '3 mins'})
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Confirmed
              </span>
            </div>

            {/* Driver Profile Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3.5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-brand-600 flex items-center justify-center font-bold text-white text-lg shadow-md">
                    MR
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black text-base">Marcus Vance</h4>
                  <div className="flex items-center space-x-2 text-xs text-black font-semibold mt-0.5">
                    <span className="flex items-center text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                      4.99
                    </span>
                    <span>•</span>
                    <span>3,420 trips</span>
                  </div>
                  <div className="text-xs font-bold text-brand-600 mt-1">
                    White Toyota Highlander Hybrid
                  </div>
                  <div className="text-[11px] font-mono font-bold text-black tracking-wider">
                    Plate: 7BKM92
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => alert('Connecting your masked call to driver Marcus...')}
                  className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Opening encrypted in-app driver chat...')}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-black transition-all"
                  title="Message Driver"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Boarding Security PIN */}
            <div className="bg-black text-white rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  Your Boarding PIN
                </span>
                <p className="text-xs text-neutral-300">Share with Marcus before entering car</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-700 px-3.5 py-1.5 rounded-xl font-mono text-xl font-extrabold text-brand-300 tracking-widest">
                4 8 2 1
              </div>
            </div>

            {/* Route recap */}
            <div className="space-y-3 bg-white rounded-2xl p-4 border border-slate-200 text-xs">
              <div className="flex items-start space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Navigation className="w-2.5 h-2.5 fill-brand-600" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-black">Pickup</span>
                  <div className="font-bold text-black">{bookingData?.pickup || 'Current Location'}</div>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 fill-blue-600" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-black">Destination</span>
                  <div className="font-bold text-black">{bookingData?.destination || 'Metropolitan Arts Center'}</div>
                </div>
              </div>

              {bookingData?.childSeat && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-brand-700 font-bold">
                  <span className="flex items-center space-x-1.5">
                    <Baby className="w-3.5 h-3.5" />
                    <span className="capitalize">{bookingData.childSeat} seat included</span>
                  </span>
                  <span className="font-bold text-emerald-700">$0.00</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-bold text-black text-sm">
                <span>Total Fare (Fixed)</span>
                <span className="text-brand-600 text-base">{rideType.price}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-full text-xs font-normal text-black bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel Ride
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Trip simulation started! Driver will arrive in ~3 minutes. Thank you for choosing BuckledIn.');
                  onClose();
                }}
                className="py-2.5 px-4 rounded-full text-xs font-normal text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all cursor-pointer"
              >
                Track on Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
