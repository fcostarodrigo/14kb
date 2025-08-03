import os

with open("14kb.bin", "wb") as f:
    f.write(os.urandom(14 * 1024))  # 14KB

with open("15kb.bin", "wb") as f:
    f.write(os.urandom(15 * 1024))  # 15KB
