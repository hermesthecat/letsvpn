export interface WGPeer {
    id: string;
    enabled: boolean;
    private_key?: string;
    public_key: string;
    config?: string;
    qr?: string;
    address: string;
    address6?: string;
    dns?: string;
    allowed_ips: string;
    keepalive?: number;
    /* The server this peer is configured for */
    server: WGServer;
    /* The user this peer belongs to */
    user: User;
}

export interface WGServer {
    /* The ID of the server */
    id: string;
    /* The name of the interface for this server */
    name: string;
    /* Is this the default server when creating new peers? */
    default: boolean;
    /* Is the server enabled? */
    enabled: boolean;
    /* The external IPv4 address of this server */
    wan: string;
    /* The external IPv6 address of this server */
    wan6?: string;
    /* The tunnel IPv4 address of this server */
    address: string;
    /* the tunnel IPv6 address of this server */
    address6: string;
    /* The subnet of the tunnel for IPv4 */
    subnet: number;
    /* The subnet bits of the tunnel for IPv6 */
    subnet6?: number;
    /* The port this server will listen on */
    port: number;
    /* The private key used to secure the server */
    private_key?: string;
    /* The public key paired with the private key */
    public_key: string;
    /* Generated config file that includes values listed above, as well as those from WGPeers */
    config?: string;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    is_superuser: boolean;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    last_login?: string;
    gravatar: string;
    groups: any;
    user_permissions: any;
    // TODO: complete interface to remove `any`
}