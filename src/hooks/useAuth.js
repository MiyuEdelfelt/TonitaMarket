const useAuth = () => {
    const usuario = localStorage.getItem('usuarioTonita');
    return usuario ? JSON.parse(usuario) : null;
};

export default useAuth;
