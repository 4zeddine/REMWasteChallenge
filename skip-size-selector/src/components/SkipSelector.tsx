import React, { useState } from "react";
import type { Skip } from "../types/skip";
import { useSkips } from "../hooks/useSkips";
import { SkipCard } from "./SkipCard";
import {
  TruckIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyPoundIcon,
  ClockIcon,
  SparklesIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export const SkipSelector: React.FC = () => {
  const { skips, loading, error } = useSkips();
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [sortBy, setSortBy] = useState<"size" | "price">("size");
  const [filterByRoad, setFilterByRoad] = useState<"all" | "road" | "no-road">(
    "all"
  );

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
    console.log("Selected skip:", skip);
  };

  // Sort and filter skips
  const processedSkips = React.useMemo(() => {
    let filtered = skips;

    // Apply road filter
    if (filterByRoad === "road") {
      filtered = filtered.filter((skip) => skip.allowed_on_road);
    } else if (filterByRoad === "no-road") {
      filtered = filtered.filter((skip) => !skip.allowed_on_road);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === "size") {
        return a.size - b.size;
      } else {
        return a.price_before_vat - b.price_before_vat;
      }
    });
  }, [skips, sortBy, filterByRoad]);

  console.log("skips:", skips);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Loading Animation */}
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto">
              <TruckIcon className="w-10 h-10 text-white animate-bounce" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 animate-pulse"></div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Loading Skip Options
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We're fetching the best skip sizes for your project...
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 mx-auto mb-8">
            <ExclamationTriangleIcon className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25"
            >
              Try Again
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sorting */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Results Count */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <FunnelIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {processedSkips.length} Skip
                    {processedSkips.length !== 1 ? "s" : ""} Available
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose the perfect size for your project
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Filter by Road */}
                <select
                  value={filterByRoad}
                  onChange={(e) =>
                    setFilterByRoad(
                      e.target.value as "all" | "road" | "no-road"
                    )
                  }
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="all">All Skips</option>
                  <option value="road">Road Placement OK</option>
                  <option value="no-road">Permit Required</option>
                </select>

                {/* Sort by */}
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "size" | "price")
                  }
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="size">Sort by Size</option>
                  <option value="price">Sort by Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {processedSkips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              onSelect={handleSkipSelect}
              isSelected={selectedSkip?.id === skip.id}
            />
          ))}
        </div>

        {/* Empty State */}
        {processedSkips.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TruckIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No skips match your criteria
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your filters to see more options
            </p>
            <button
              onClick={() => {
                setFilterByRoad("all");
                setSortBy("size");
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Selected Skip Summary */}
        {selectedSkip && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Skip Selected
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Review your selection and continue
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Skip Details */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedSkip.size} Yard Skip
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Perfect for{" "}
                      {selectedSkip.size <= 4
                        ? "garden clearance and small DIY projects"
                        : selectedSkip.size <= 8
                        ? "home renovation and medium projects"
                        : selectedSkip.size <= 12
                        ? "construction work and large projects"
                        : "major commercial projects"}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                        <ClockIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {selectedSkip.hire_period_days} Days
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Hire Period
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                        <TruckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          Free Delivery
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Next Day Service
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Road Placement Warning */}
                  {!selectedSkip.allowed_on_road && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-amber-800 dark:text-amber-200 text-sm">
                            Not Allowed On The Road
                          </div>
                          <div className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                            This skip size not allowed on public roads. We can
                            help arrange this for you.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <CurrencyPoundIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {(
                          selectedSkip.price_before_vat *
                          (1 + selectedSkip.vat / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Total inc. VAT & Delivery
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Skip Hire:
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          £{selectedSkip.price_before_vat.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          VAT ({selectedSkip.vat}%):
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          £
                          {(
                            (selectedSkip.price_before_vat * selectedSkip.vat) /
                            100
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Delivery:
                        </span>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          FREE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-3 group">
                <SparklesIcon className="w-5 h-5" />
                <span>Continue to Next Step</span>
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
