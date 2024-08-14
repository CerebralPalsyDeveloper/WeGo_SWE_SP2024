**Vehicle Navigation System VSIM**

### Overview
The Vehicle Navigation System VSIM is a Python program designed to simulate a vehicle navigation system. It allows for the management of multiple vehicles, enabling functionalities such as starting, stopping, and tracking their current locations. The program utilizes threading to efficiently handle multiple vehicles concurrently.

### Requirements
- Python 3.0

### Installation
1. **Clone the Repository:**
    - Clone the repository using SourceTree, our user-friendly client for Git operations.
    - If you haven't installed SourceTree yet, download and install it.
    - Alternatively, clone the repository via the command line.
    - Click the clone button under the Source heading in Bitbucket.
    - Proceed with the checkout in SourceTree, creating an account if necessary.
    - In the Clone New dialog, update the destination path if desired, and click Clone.
    - Open the directory to access your repository's files.
  
2. **Install Dependencies:**
    - If any dependencies are required, install them using pip with the command:
      ```
      pip install -r requirements.txt
      ```
  
3. **Run the Program:**
    - Execute the program using the command:
      ```
      python main.py
      ```

### Usage
Upon running the program, a display presents all Vehicle IDs and IDs with associated orders/routes. Users can interact via a menu to start/stop vehicles and obtain their current locations. The program facilitates:

- Selection of actions by entering corresponding numbers and IDs.
- Traversal of assigned routes by vehicles, updating their current locations and availability.
- Notification upon completion of a vehicle's route.

### Files
- **main.py:** Contains the main code for vehicle navigation and user interaction.
- **README.md:** This file, providing project information.

```python
import threading
import time
import requests
from datetime import datetime
import polyline
```

### Test
To run tests, ensure you have pytest installed. If not, install it via pip:
```
pip install pytest
```
Execute tests by running the following command in the project directory:
```
pytest Autombile_TEST.py
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add your feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

### Credits
- **Christian Hartman**
- **Saumya Rajasekaran**