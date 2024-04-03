# Leadzai's Weather App
Live demo: [leadzai.arkheg.com](https://leadzai.arkheg.com)

## Features:
- Displays the current temperature in a specific city.
- Includes an icon representing the weather, e.g., a sun.
- Displays the sunrise and sunset times in local time.
- Offers a switch to toggle the temperature value between Celsius and Fahrenheit.
- ~~Select with at least 3 cities included~~ A combobox was introduced instead. It has a built-in select with 7 predefined cities and additionally can work as a dynamic search. Once the user enters a city, a request will be sent to the server. If the city is found, data will be displayed; otherwise, an error message will appear.

## Dependencies:
As stated in the requirements, I tried to avoid adding new dependencies as much as possible. Ultimately, I ended up with 7 dependencies:

#### Utility:
- ***prettier*** - A package for automatic code formatting, making the code cleaner and more readable.
- ***react-app-rewired*** - A package that allows overriding CRA config without the need to eject everything. It was installed to introduce ***aliases*** to the project and simplify imports.
#### Functional
- ***effector*** - A simple state manager that allows for simple, yet very efficient control of state and API requests. It has been used primarily for API requests. Motivation: I believe that using native React rerender logic to handle API requests is an unoptimized and in some cases, even dangerous approach. Alternatives like ***react-query*** and ***rtk-query*** exist, but I believe they are overkill for such a project. Hence the decision to use effector.
- ***effector-react*** - A library that connects ***effector*** and ***react***.
- ***patronum*** - A utility library built on top of ***effector***. It was used for simplified API request status processing and debounced requests logic.
- ***dayjs*** - A simple date processing library. It was used for parsing Unix timestamps into local sunrise/sunset times.
- ***Axios*** - Library for handling API requests.
