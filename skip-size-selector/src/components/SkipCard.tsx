import React from "react";
import type { Skip } from "../types/skip";
import {
  TruckIcon,
  CurrencyPoundIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

interface SkipCardProps {
  skip: Skip;
  onSelect: (skip: Skip) => void;
  isSelected?: boolean;
}

export const SkipCard: React.FC<SkipCardProps> = ({
  skip,
  onSelect,
  isSelected = false,
}) => {
  const getSkipImageUrl = (size: number) => {
    return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
  };

  // Calculate total price including VAT
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  const skipName = `${skip.size} Yard Skip`;

  // Get size-based styling
  const getSizeInfo = (size: number) => {
    if (size <= 4)
      return {
        color: "blue",
        category: "Small",
        suitable: "Garden clearance, DIY",
      };
    if (size <= 8)
      return {
        color: "green",
        category: "Medium",
        suitable: "Home renovation",
      };
    if (size <= 12)
      return {
        color: "purple",
        category: "Large",
        suitable: "Construction work",
      };
    return {
      color: "orange",
      category: "Extra Large",
      suitable: "Major projects",
    };
  };

  const sizeInfo = getSizeInfo(skip.size);

  return (
    <div
      className={`
        group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-2xl overflow-hidden transform hover:scale-[1.02]
        ${
          isSelected
            ? "ring-2 ring-blue-500 shadow-blue-500/25 border-blue-200 dark:border-blue-700"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
        }
      `}
      onClick={() => onSelect(skip)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 z-20">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <CheckCircleIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Yards Badge */}
      <div
        className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-lg bg-gradient-to-r from-${sizeInfo.color}-500 to-${sizeInfo.color}-600`}
      >
        <div className="flex items-center space-x-1">
          <TruckIcon className="w-4 h-4" />
          <span>{skip.size} Yards</span>
        </div>
      </div>

      {/* Skip Image Container */}
      <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        <img
          src={getSkipImageUrl(skip.size)}
          alt={`${skip.size} yard skip`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.nextElementSibling?.classList.remove("hidden");
          }}
        />

        {/* Fallback placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center hidden">
          <div className="text-center">
            <div
              className={`w-24 h-16 bg-gradient-to-br from-${sizeInfo.color}-400 to-${sizeInfo.color}-500 rounded-lg flex items-center justify-center transform rotate-3 shadow-lg mb-4`}
            >
              <div className="text-white text-sm font-bold text-center">
                SKIP
                <br />
                {skip.size}YD
              </div>
            </div>
            <TruckIcon className="w-8 h-8 text-gray-400 mx-auto" />
          </div>
        </div>

        {/* Size Category Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div
            className={`bg-gradient-to-r from-${sizeInfo.color}-500 to-${sizeInfo.color}-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm bg-opacity-90`}
          >
            <div className="flex items-center space-x-1">
              <SparklesIcon className="w-3 h-3" />
              <span>{sizeInfo.category}</span>
            </div>
          </div>
        </div>

        {/* Not Allowed on Road Badge */}
        {!skip.allowed_on_road && (
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg backdrop-blur-sm bg-opacity-90 group/warning relative">
              <ExclamationTriangleIcon className="w-3 h-3" />
              {/* <span>Not Allowed On The Road</span> */}

              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover/warning:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="flex items-start space-x-2">
                  <ShieldCheckIcon className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Not Allowed On The Road</div>
                    <div className="text-gray-300 mt-1">
                      This skip size not allowed on public roads.
                    </div>
                  </div>
                </div>
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Skip Details */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {skipName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {sizeInfo.suitable}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Hire Period */}
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Hire Period
                </div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {skip.hire_period_days} days
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <TruckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Delivery
                </div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  Next Day
                </div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <CurrencyPoundIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Inc. VAT & Delivery
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Before VAT
                </div>
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  £{skip.price_before_vat.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Select Button */}
          <button
            className={`
              w-full py-4 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm
              ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transform scale-[0.98]"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/50 dark:hover:to-blue-800/50 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(skip);
            }}
          >
            {isSelected ? (
              <>
                <CheckCircleIcon className="w-5 h-5" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <span>Select This Skip</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>

          {/* Additional Info */}
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Same Day Collection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};
