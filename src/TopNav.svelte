<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
            <img src="favicon.png" class="mr-3 h-6 sm:h-10" alt="Alt Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Zilpay+Svelte+Tailwind</span>
        </a>
        {$b32} {$net}

        <button type="button" 
                class="text-white bg-black hover:bg-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                on:click={ZilpayConnect}>
            {status}
        </button>

    </div>
</nav>

<script>

    import { user_bech32, user_base16, user_network, zil_amount } from './store/walletStore.js';
    let status = "Not Connected"

    $: b32 = user_bech32
    $: b16 = user_base16
    $: net = user_network

    // async function GetBalance(base_16)
    // {
    //     const balance = await Zilliqa.blockchain.getBalance('1eefc4f453539e5ee732b49eb4792b268c2f3908');
    //     console.log(balance.result);
    // }

	async function ZilpayConnect()
	{
        if (window.zilPay.wallet.isEnable) 
        {
            if(await window.zilPay.wallet.connect())
            {
                console.log(window.zilPay.wallet.defaultAccount.bech32)
                user_bech32.set(JSON.stringify(window.zilPay.wallet.defaultAccount.bech32));
                user_base16.set(window.zilPay.wallet.defaultAccount.base16);
                user_network.set(window.zilPay.wallet.net);
                //let t = await GetBalance(window.zilPay.wallet.defaultAccount.base16.toString().substring(2))
                //console.log(JSON.stringify(t))
                console.log(`b16 ${JSON.stringify(user_base16)} // b32 ${user_bech32} // net ${network}`)
                status = window.zilPay.wallet.defaultAccount.bech32
            }
            else
            {
                status = "Couldn't connect..."
            }
        }
        else
        {
            status = "Sign into Zilpay..."
        }
	}

    if (window.zilPay.wallet.isEnable) {
    window.zilPay.wallet.observableAccount().subscribe(function (account) 
    {
        user_bech32.set(account.bech32);
        user_base16.set(account.base16);
        status = account.bech32
    });
    window.zilPay.wallet.observableNetwork().subscribe(function (new_net) 
    {
        user_network.set(new_net);
    });
}

</script>
