import subprocess
import urllib.request
import requests


from api.logging import log


def generate_keypair():
    # Generate private key
    private_process = subprocess.Popen(['wg', 'genkey'], stdout=subprocess.PIPE)
    private = private_process.stdout.read().decode('utf-8').strip()
    log.debug(f'Private key: {private}')

    # Generate public key from private key
    public_process = subprocess.run(['wg', 'genkey'], stdout=subprocess.PIPE, stdin=private_process.stdout)
    public = public_process.stdout.decode('utf-8').strip()
    log.debug(f'Public key: {public}')
    return private, public


def get_external_ip():
    # TODO: requests doesn't work in asyncio
    try:
        EXTERNAL_IPV4 = requests.get('https://ipv4.icanhazip.com/').content.decode('utf-8').strip()
    except ConnectionError:
        log.error('Unable to resolve external IPv4 address.  Using local.')
        EXTERNAL_IPV4 = None
    try:
        EXTERNAL_IPV6 = requests.get('https://ipv6.icanhazip.com/').content.decode('utf-8').strip()
    except ConnectionError:
        log.error('Unable to resolve external IPv6 address.  Using local.')
        EXTERNAL_IPV6 = None
    return EXTERNAL_IPV4, EXTERNAL_IPV6
