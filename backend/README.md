# Back end microservices

## Virtual environment

Create a new Python virtual environment in this directory:

```bash
python -m venv venv
```

Activate the virtual environment:

- Powershell

  ```powershell
  .\venv\Scripts\Activate.ps1
  ```

- Bash

  ```bash
  source ./venv/bin/activate
  ```

## Dependencies

On Ubuntu, it might be necessary to first install the following packages using `apt`:

```
libmysqlclient-dev libpython3-dev
```

Then install all of the required Python packages:

```bash
pip install -r requirements.txt
```
