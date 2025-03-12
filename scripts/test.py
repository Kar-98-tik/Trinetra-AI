from pathlib import Path
import os

def load_env():
    """Load environment variables from .env.local"""
    env_path = Path(__file__).resolve().parent / ".env.local"
    if not env_path.exists():
        raise FileNotFoundError(f"Environment file not found: {env_path}")
        
    with env_path.open() as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                os.environ[key.strip()] = value.strip().strip('"').strip("'")
                print(f"Loaded {key}")  # Debugging

load_env()
print("GOOGLE_API_KEY:", os.environ.get("GOOGLE_API_KEY"))  # Debugging
