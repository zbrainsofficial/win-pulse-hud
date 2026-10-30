cmake_minimum_required(VERSION 3.20)
project(WinPulseNative VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(win_pulse_telemetry STATIC
    src/win_telemetry.cpp
    include/win_telemetry.hpp
)

target_include_directories(win_pulse_telemetry PUBLIC include)

if (WIN32)
    target_link_libraries(win_pulse_telemetry PRIVATE psapi)
endif()
