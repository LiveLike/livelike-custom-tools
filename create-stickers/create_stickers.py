# import required module
import os
import requests
from pathlib import Path

#Change below var values
sticker_packId = "stick-pack-id"
folder_path = "folder-path"
access_token = "your-access-token-here"


def create_sticker(path_array):
    url = f"https://cf-blast.livelikecdn.com/api/v1/sticker-packs/{sticker_packId}/"
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    index = 0
    payload = {}
    files = []
    for path in path_array:
        shortcode_key = f'stickers[{index}]shortcode'
        sticker_packid_key = f'stickers[{index}]pack_id'
        print(shortcode_key)
        print(sticker_packid_key)
        payload[shortcode_key] = Path(path).stem
        payload[sticker_packid_key] = sticker_packId
        files.append((f'stickers[{index}]file', (f'{Path(path).stem}', open(f'{path}', 'rb'), 'image/png')))
        index += 1

    print(files)
    print(payload)
    response = requests.patch(url, data=payload, headers=headers, files=files)

path_to_process = []
files = os.listdir(folder_path)
for filename in files:
    f = os.path.join(folder_path, filename)
    # checking if it is a file
    if os.path.isfile(f) and f.endswith(".png"):
        path_to_process.append(f)
        print(f"11 {path_to_process}")
        if len(path_to_process) == 2 or filename == files[-1]:
            print("Processing")
            create_sticker(path_to_process)
            path_to_process = []
