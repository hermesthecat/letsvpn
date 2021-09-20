import subprocess
import urllib

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
    EXTERNAL_IPV4 = urllib.request.urlopen('https://ipv4.icanhazip.com/').read().decode('utf-8').strip()
    EXTERNAL_IPV6 = urllib.request.urlopen('https://ipv6.icanhazip.com/').read().decode('utf-8').strip()
    return EXTERNAL_IPV4, EXTERNAL_IPV6
