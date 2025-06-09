import React from "react";
import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  DocumentCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const Header: React.FC = () => {
  const steps = [
    {
      number: 1,
      label: "Postcode",
      active: true,
      completed: true,
      icon: MapPinIcon,
      description: "Enter location",
    },
    {
      number: 2,
      label: "Waste Type",
      active: true,
      completed: true,
      icon: TrashIcon,
      description: "Select waste",
    },
    {
      number: 3,
      label: "Select Skip",
      active: true,
      completed: false,
      icon: TruckIcon,
      description: "Choose size",
    },
    {
      number: 4,
      label: "Permit Check",
      active: false,
      completed: false,
      icon: DocumentCheckIcon,
      description: "Road permit",
    },
    {
      number: 5,
      label: "Choose Date",
      active: false,
      completed: false,
      icon: CalendarDaysIcon,
      description: "Schedule delivery",
    },
    {
      number: 6,
      label: "Payment",
      active: false,
      completed: false,
      icon: CreditCardIcon,
      description: "Complete order",
    },
  ];

  return (
    <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Section */}
        <div className="pt-6 pb-4 text-center">
          <div className="inline-flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <TruckIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              REMWaste
            </h2>
          </div>
          <p className="text-gray-400 text-sm">
            Professional Skip Hire Service
          </p>
        </div>

        {/* Progress Steps - Desktop */}
        <div className="hidden lg:flex items-center justify-center py-8 space-x-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center space-y-3 group">
                  {/* Step Circle with Icon */}
                  <div className="relative">
                    <div
                      className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-lg
                        ${
                          step.completed
                            ? "bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/25"
                            : step.active
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25"
                            : "bg-gradient-to-br from-gray-700 to-gray-800 shadow-gray-800/25"
                        }
                      `}
                    >
                      {step.completed ? (
                        <CheckCircleIcon className="w-8 h-8 text-white" />
                      ) : (
                        <IconComponent
                          className={`w-8 h-8 ${
                            step.active ? "text-white" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                    {/* Step Number Badge */}
                    <div
                      className={`
                      absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center
                      ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : step.active
                          ? "bg-blue-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }
                    `}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Step Info */}
                  <div className="text-center">
                    <div
                      className={`
                      font-semibold text-sm transition-colors
                      ${
                        step.active || step.completed
                          ? "text-white"
                          : "text-gray-400"
                      }
                    `}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`
                      h-0.5 transition-colors duration-300
                      ${
                        steps[index + 1].completed || steps[index + 1].active
                          ? "bg-gradient-to-r from-blue-500 to-gray-600"
                          : "bg-gray-700"
                      }
                    `}
                      style={{ width: "60px" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Steps - Mobile & Tablet */}
        <div className="lg:hidden py-6">
          {/* Current Step Highlight */}
          <div className="text-center mb-6">
            {(() => {
              const currentStep = steps.find(
                (step) => step.active && !step.completed
              );
              if (!currentStep) return null;
              const IconComponent = currentStep.icon;
              return (
                <div className="inline-flex flex-col items-center space-y-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 relative">
                    <IconComponent className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full text-white text-sm font-bold flex items-center justify-center">
                      {currentStep.number}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-white text-lg">
                      {currentStep.label}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {currentStep.description}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Progress Bar */}
          <div className="px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-gray-400">
                Step {steps.findIndex((s) => s.active && !s.completed) + 1} of{" "}
                {steps.length}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((steps.filter((s) => s.completed).length + 0.5) /
                      steps.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Mini Steps */}
          <div className="flex justify-center mt-6 space-x-2">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center space-y-1"
                >
                  <div
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200
                      ${
                        step.completed
                          ? "bg-green-500"
                          : step.active
                          ? "bg-blue-500"
                          : "bg-gray-700"
                      }
                    `}
                  >
                    {step.completed ? (
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    ) : (
                      <IconComponent
                        className={`w-4 h-4 ${
                          step.active ? "text-white" : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {step.label.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Select the perfect skip size for your project. All prices include
            VAT and delivery.
          </p>

          {/* Quick Info Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-400 text-sm font-medium">
                Free Delivery
              </span>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-400 text-sm font-medium">
                Next Day Service
              </span>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-purple-400 text-sm font-medium">
                Eco-Friendly
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
