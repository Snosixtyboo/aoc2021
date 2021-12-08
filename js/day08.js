function solve_part1(input) {
    const pattern_disp = input.split('\n').map(l => l.split('|'));
    let result = pattern_disp.reduce((sum1, line) => sum1 + line[1].split(' ').reduce((sum2, displayed) => sum2 + ([2, 3, 4, 7].includes(displayed.length) ? 1 : 0), 0), 0);
    return result.toString();
}
function solve_part2(input) {
    const patterns_display = input.split('\n').map(l => l.split('|'));
    const result = patterns_display.reduce((sum, pd) => {
        let patterns = pd[0].trim().split(' ');
        let n = [];
        [n[1], n[4], n[7], n[8]] = [2, 4, 3, 7].map(count => patterns.find(d => d.length == count));
        patterns = patterns.filter(p => ![n[1], n[4], n[7], n[8]].some(x => x == p));
        const r = n[1].split('');
        const tl = n[4].split('').filter(s => !n[1].includes(s));
        const bl = n[8].split('').filter(s => !n[4].includes(s) && !n[7].includes(s));
        n[6] = patterns.find(p => tl.every(s => p.includes(s)) && bl.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[6]);
        n[9] = patterns.find(p => r.every(s => p.includes(s)) && tl.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[9]);
        n[5] = patterns.find(p => tl.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[5]);
        n[2] = patterns.find(p => !r.every(s => p.includes(s)));
        patterns = patterns.filter(p => p != n[2]);
        n[0] = patterns[0].length == 6 ? patterns[0] : patterns[1];
        n[3] = patterns[0].length == 6 ? patterns[1] : patterns[0];
        const displayed = pd[1].trim().split(' ').map(p => p.split('')).reduce((s, d) => s * 10 + n.findIndex(x => x.split('').every(s => d.includes(s)) && d.every(s => x.includes(s))), 0);
        return sum + displayed;
    }, 0);
    return result.toString();
}
// EOC
export { solve_part1, solve_part2 };
console.log(solve_part2(`bg gcdaeb aebg efabdcg abdce cafdbe fcbdeg bdacg gbd cafgd | daecb dcbae gb eabg
eabfdc fgd cegd aedgf fbacgd dceaf dg aebdcgf efbag edgfac | cgebadf dgce deafc acdbfg
dcgfb fe bcgefd adecfb fgdec dfe egadc fadgceb facbgd befg | fdacgb fbcdg dcefbg bcdfg
gebdcf eg ecgabd gabed agdfb dbace fgbacde facebd egd gcea | agdbe gde deg agcebd
efb fgeacbd efcdb adfe fcdabg cabfd dcebg deafcb cgbfae ef | bgcde adcgbf feb adfe
gfdcaeb cdgfa agefc cge cgadfb fegdbc ecda eagbf gdfcae ec | dfbecg degcaf gafcd cge
eacbdg gdfb dfcbge cgd egcdf gd bfedc aedcfb fcgea bdafceg | gd gcbefd begadcf gcd
gafced dcge ec gafcbde efgca agefb defabc eac cafdg dagbfc | fegba edcbagf efacg eca
ebfdc dbfae cbfgd agbecd ced ec dcefbga ecfg fgbdac fbedcg | ce ce cgadfb ecd
dgbfe gcbdaf cbegfa gfcda gadfce gbafedc ecg ce cgdfe aecd | efbcgda fbaegc cdae dcae
fca gcbfed ecadfbg fbgcda gfbdc cfadb afcbeg fa baced fagd | afc fdcbge af badcfg
fdegc defgacb acged gf deacfg cfg fbaecg abcgde dfag befcd | fgc egfdc cdaebg ebgcad
afgdbce ebfcd dfbecg bafged bg bcged egcda fabcde bdg fbgc | dbg gbd dgfeab fdebc
ecdbfa cage cdaegf dfgea cadbfge dbagfc ea dbfge efa cfdga | ea afe fgcad dgfcab
dafge cebf cgebd ecbgadf gbf bf debgf cdgfbe dbgcae gdacbf | defag edbcg becf bgf
gdb egfabc dbcfeg fagd gd abcde gdabfe fabge fcabedg debga | gfda bdg gaebf gbd
cbdfg fbcdgea ebdc bc cgb egfdb facgd egdfcb fbgade facbeg | gcfbd dbce dcbe fbdceg
fg afg agedcb fbdgeac gbfca eacgfd fceab cgabd bfdgac bgdf | bgdf afebgcd dbgafc bdfg
fbagced cegfd feabc dfbacg bg eagb bcaefd abegfc gfb ebfcg | gfb gb gbf gdfce
dfceba bdcaf decab ea bae acebdfg egabfd bdgec cbadgf efac | dcbeg bdceafg ae abcfd
gbfeac deagc geafc efgb agfcdeb dbacgf ecbfa cfg fg edbcaf | cgeda fegb aebfc gf
acgbfed cabdef gfbcde abced ca dbafgc adc fcedb feca aebdg | gecfdb caefdb baedcf cgeabfd
ed bdge dceagb gafceb dce cgaed bdgecfa gabec fdagc aedbfc | acdeg dce dcbega dfgca
ecgdb cbefdg fgbc cfegad cf fce fadeb bdgeac agecfbd fdcbe | fc bgdace cfe edfacg
ed fdbgc cfeab adbgfc adgebf ebdcf fgedbc gecd def dcgaebf | dfagbc bagdcf gdce ed
bgdfa gefbcd fdceab fe fabde edf caebd acfe deagbc dcbfeag | fe fbgedc abecdg fdebac
bafgde cfgba dcbag fcbgae dafc fdgebac da bdcagf gad cgdbe | dfca ad dga fcbgdea
abecgd agbec bcfegd gfacbde ca bafced fabeg acb cgbed agdc | gdceb cfdbage afbdgce begac
cfb gdafb dfcgba facbde cdefabg egdcf gfcbd cb agbc febgda | cb efbacd agbc cb
bdce dgaec dcefga dcaegb fbgae dba db afdbcg fceagbd gdabe | eagbdcf bd febgacd cebd
bad fgeab bd agfdce fcadeb agdec edbfgca dcbg bcegda edgba | dbfeac bfecda bfgecda dbgc
egcbfad gdfec faced ecdgfb decfga fac fa fdag cfbgae baced | gcfaed aedcfg fadg fa
ebfdc gadcfb fcgdea ace abcde ea gecdabf gdcba gbae dacbeg | bfdgac gadcb acbgd ae
gcafe abfged egfadbc fbdec dg gdebfc gfedc dbcg fcbead gde | gdbc faegc gde deagbfc
decabg gdcfa dfbca cgdefab bdegfa afcdeb bdcea bdf bf becf | aebdfc efbc dfegab bf
cdfegb gcdaf fa bfdacge egfa daf gdbac degcf adfecg ebcfda | cedgbaf fdgec afd gadcf
gd bcfde adegfc cegbfd gdc dgbe bdgcf gfaebcd cabfg edacfb | daecgf agbcf caebfd cbedaf
decbf ebcfg egcaf gfaecb gbf gaeb cadegf ecgfabd agdbfc gb | fgb dfcgae cfbge abfgce
bgfed cedgf cegabf gfc fc eagbdc caegd fcad dbaecgf dfceag | fcda efdbg fedgb bfaedcg
dcafbg aebdc fgdcb efc fgedca fe gbfe fdbagec cfebd cebdgf | gbef gfcbd cef ef
fabdgc cbd db cfgda cfabd eacgdf dagb abefdgc fbeac gdfcbe | bfdca ebdagfc dcb bdag
bgdface geabdc edabg aeb agec ea fcagbd acdfbe acdbg bdegf | cbedgaf bgcaed ea abfedc
abfeg fedbag fbegc dcgfbae fbgcd ec abefcg eafdcg fec aebc | gabef ec geabf fcgdb
gdcbef edfbg cg cafgbd gedc gcefb acfegdb eacbf dbfgea gcb | cgb bfdge gefbc agbfdc
gecbfad fdga debagc da bcdgaf abcfd abcfg bad dfebc aefbcg | cbfga dbcaf cfbda fgad
cbegdf cdga bfaecg egdfc dfaceg fbedagc dgeaf ga gfa efbda | gcdaef agf fga efdag
abd dcaf ad cbgefd abcge ecdbfag cbedf fgbade adebc acdebf | bagec dcfa ad dbaec
efcdb cedgaf edfcab dgecb dgbf egd baegc dg efdgbc gbefcda | afcdeb dg cfbdge gcbed
bgdfca bgf bfgac gdfc cedabg gabedf fdbagec cebfa gbdac fg | facbg cfagb abcgd edagbc
ebagdcf ecgbfa bgadf bdfac cfb cbdgfa ceadb cf dgcf fabdeg | cdfab eagfdb gdfeba fc
gbc bc fegac cfgeda gfcba acbe bcegfd abfgd dgaefcb ecbgfa | edfbgc ecab cbfag efagdbc
de gacfeb fabce ecgbdf adbef cbgdeaf aced dfe bfadg fcabde | gbdefca daefb cgedfb cead
dbf edbfa bedcgfa begafc fdega db cadb facebd fcaeb fdcgbe | bcgfea cbefda fabce cabfe
fcb cegbdf fgdeb fcdeb cfdae cgdb cfgabe bc agcbfde aebfdg | gcdb fcb bdefg edfbg
gfead fgdcbe egdfacb gacd cdf ecgfda edacf adbgfe dc ebcfa | agdc fdc geacbfd fagdbe
gcfabe cefag dafg agecd ad decbg fcedgba cedafg cda ebcfda | aebcfd bfdeagc afecg cgbedaf
gcefdb aecbfgd fdegb ga fgcbda eagf aedgb dceba befdga gad | edagfb gad fgae ebgad
abdfge gfcea bcdg decabf gadbf cafgd dc cdf cdabgf dfceagb | gfdca bcagdf eagdbf dfc
ab dfagbe efbacd fba acfdeg efgad eabdgfc bfgea egcbf adgb | dafgbe gbafe ab dagbcef
febgd gbf bf cdebga gdebc bfcedg befc agcedfb cbgafd agfed | bf degaf gcdeb fbg
cegdfa db cafegdb decga gbd aedb gecfb bdcgfa cdagbe becdg | agbdefc cadbefg fgbce db
gcdfabe fcabg gafdc fbagec bf agbce gbf dcebga feab gcfdbe | cegba fb bdcgefa bgf
bfc cedafb bacfg gedcba acdbg dcfbega gdfb acfge bf adbgcf | fb fcb bf dfcbea
bdgca fca edfbac gcdf fc cbgeda afbgc afebg fbdgac gfeadbc | bfcdga adbfce gbedca cf
cf abdfce fabdg bcdgfa fgcb caebdfg cgdfa ecadg cdf gbedaf | fc acdfbg gcbf cfd
dcbea dfgcbe dbefag dcbaf cgfa fa cbgdf bfa begcfda adgfcb | fba abf edcbfg gcbdef
gd fgbacd geda dfecb cdg ceagb ecgdb dceafbg afcgeb cdebga | dacfbge efacgb eadg gdcbe
dfbcae fe bfcgea cefg fgeab fgdab dgecab fdgeabc eagbc aef | ef fbdcaeg aefcbg efa
fdcgb cdeabf gdafcb efcg bfagced fe gfebcd gdbfe feb bgeda | fcgbd fe bdegf gefc
cdgaeb gfeabdc dbfg bdc gcadbf fdbac db gcabf cgeafb eafcd | decfa bdfg bfadcg bd
fdgea ab eafb dafcge cdbaefg eadbgf edacbg fbdgc gfbad gba | ba ab ab gdbfae
bacdfe defab fbeg egfad dfbagce fg febgda gfdbca fga gdaec | dgbfac dcgae bedfa bfeg
feadb cbd fgbedac bdceag bcaf aefcdb cb decbf edgcf bfdeag | fabged egdcf fbgdace bfedca
cdafe agfedbc gebc aeb fegdba cabgfe cfbea dabcfg eb cbgfa | gacbdf egfbcad cadfe gcbe
deg dbecg abdce agcfebd dg defgcb fagecb febgda fcdg ebfgc | debfcg egcbafd cfadbeg cgdf
cebfad efc dbcfg gfdcbe cfdgba agfed ec becg dfgec gedbfac | bgfdc fce gfedc gbfadc
eabdcf bfcgd gabdfe bacfe bde eadc cbdagfe ebcfd ed afegcb | cdea fcgeba cbfgd bafdeg
gcdab bdafge dc aefcdg acbgfd bdfc cdg eagbc gdeacbf fgadb | dfbc gaedfbc bcfd bdcf
efdca gced dbagefc afdeg feagbd fce ce dcabf adcegf efcabg | gfebac ecafd adbegfc abfdc
bfadcg cgfda bc fbcegd fbac ebagd cagbd egcafbd cbd dfgaec | dbeag cb adgcb abdgfc
dgbef gbacf bcde cd degafc dbefag fcd gcdbf bedcfga cebfgd | cd bdcgf ebdc bagcf
gc fegdac dgefa cefab bcafdeg decg fcg dafbcg fegbda ecgfa | ceagf cg gfeca cgf
fbage cfdaegb dcfgb dbae gefacd de cbagef gfbed deg ebgdfa | fgdace fegcba ed dge
geb ebfacg gbeca gcbedf eafb egadc fbcag cfadbg fbecgad eb | fcgab baef bdagcf gfebac
egbcaf fcgab gaebdf bf dcfeabg befc aebgc bgf adcgf bgdaec | gbface dcbage fgb abcge
bgcdae fdab becadf fa beacd fae gebfc fdeagc acfeb ecabfgd | cfbea fdaebgc afe gfdeca
gefc bgadf dcebfa ef gcaebd dcbafeg cgdbef dbcge efd fgbed | acbfde gcbde dbecg fe
cadefb degbc degfb dc dfcabeg ced cabeg cbefga adgcbe agdc | efdbac acgd agebdc ecd
fcgbea gdfceb eadcb gdef gdbcafe fdc fdbec febgc bcgfda fd | cfd dfcegab dcbfga fd
gabdec dgfcea dagbe gf dgf cabgfed bagf befcd bfdage fbdge | gfcabed bfdge fagb abecdgf
abc gdcea cgbfad egcfabd eafb gfceb cfaebg fbdegc gecba ba | cab ab efcdbg efcgadb
bafdcg gdbaef cf abfc dceag fcg fadgb ebfgdac fdcga ecdgbf | gedfbc gadce adcge fcg
afb fadce dafcb ab degfbc abdcefg gabdcf fagbde bdfgc abgc | dfacbeg ebdagf afb acfdb
cfaedb dce edgcbaf bgdfc dcefb ce cbea fdgaec aebfd fgadeb | ced acgdef dfeagbc ce
egfcdb cdfgbea cgafb efgd gcdbae ecdabf bcdge df bfd fcdbg | cdebg df bfd dfebcg
gbecdfa ce ebacd dgafbc bec dfabc baedg bgacfe efdc fdbeca | cfdba ecb ec bgecfa
cadfbe bfgdeac gdeab ebfcg degfb dfag edf degabf gcebad fd | fgbed abcfde becgf begdf
fgd egdbf fgbce gcbaed dabeg dafe fd cagbefd bgedaf abfcdg | fadbgc df dfea adebfg
fdb gcadbfe fd acbde gdcf cfgbe gfbcde bdfec gabcfe ebagdf | dgfebc dgcf bfgec fcbgdea
dgcbf daegfcb ec cfae dbcega cge gbaecf fgbce fagedb befag | fcgbae cbgedaf bcfega fcae
cbadge eg dbecgf edbgf dcabef gecf fgbad ebg edbcf adcbfge | egb eafdbc geb bdfga
afebg gfcaeb bgfdce cfea af bgade fba bcefg edfgcab cadgbf | ebcfg cfageb gdbae egabd
agfdc fegb badfg fbcdgea dfbaec gdeab eafdgb abf bf cdaegb | gadbe cbdfae gdafeb gdabef
cgdeba gadcbf gebca ad afegbdc acgbfe gcade fegcd dac bdea | ebgcad becgda cad dac
becafdg gd cdg cgebfd efbcg cbaed febgac becdg bdfg ecfgda | cbgfe gd adcbe efdcagb
efcb aebgfd aecdfgb gdcaf bfa bf aecfgb cadebg gbfac ceabg | bcfe fb bf fcbe
bgaf bgedcfa ecdbfa cgfea gea baefc ag cgdfe gdcaeb ecfbga | gea ebcaf gfecd ega
adfegb degcb dgb bg adgfceb cdeagf acged gdecab abcg cfdbe | gedac gfbdace becgd ebgacd
af fgcdba bgecf bcfage dgcfeba cfa ebfa cegfbd fecag edgca | bgfaced fa fa cbgef
egbfcda deacb gfdacb fdcabe bgedc ae fade afbcd gfcaeb bae | ea bcaedfg gcaefb deaf
feagd becafg ebca eb geb cdafgb feabg faegcbd cebgdf bcagf | afcbeg afgcb facbgd fgdea
cdbfea efagd bafegc deb dgaecb dbgae db ecagdbf dbgc ecabg | gdaeb bdcg aegdcb agefd
abe cdbgafe cabef befgc fbadce ba facgde adfce bacged badf | abcedg adefc bfad bfda
beafc efdabc fbdgae dcaegbf beadc adcgb ecabfg decf de dea | egbdfa fedc febca fcabe
bd dbeg dcbfeg cgfad dfbgc ebcgf bgecaf cfadeb fbd abfdgce | deagcfb gfdca fbgec decbfg
febadgc df gecfa cebad fdeac fad gadebf dbfc eacdgb cfeadb | bafdcge afcdgeb cdgaebf fda
cgedabf debfga gfe fg gfba gacfed dfbeg bdfea dbcefa bdgec | dceagfb ebdfa dbfeg fadeb
egafcb cg ceg ebgcfad dacbef afedg gcbdea bcfae cefag gbcf | gdfea egc ecgaf fdgbcea
egfba adecfb gc cfg cfdbeg gdac eafgcd dfcea cgefa bfaecgd | gc aecdbf cgf dcbegf
abcfde eafbd dagfebc bgea aefdg dga dgbfac faebgd edcfg ga | eabg eabcgfd abeg deacbfg
ac fbgeda begcfa decgf gfcbad eagcbdf gbaef eabc gac egcaf | eafdgbc fgabdc agc cagfe
abdfg gefba ecafb eg egf febcdag egac beagfc edgcfb acbdfe | bcafed gfe eg febdgc
fgcba bge efgcab bfgae adbecg fcge defgcba bedfa abgcfd eg | ge abdef badef gfcdeab
gdecbf fcbdae acedf acfb cdbae cgdeba fc gafed fgacdbe ecf | bacf bdaecg cebad cfgdbea
abfcde fa afd degba cdgbeaf bafed eadcgf cbaf bdcfe cedbgf | dgbae bfedc fcba aedgbfc
egfadc ec ecbf abgcd gfdbae eac abedf fegacdb bcedfa cdbae | ce cdbga ceabd beagdf
bdcae bfc fb bfcdeg ebacgd aecfgdb bfdcea acdfg cbadf baef | cfbdae fbc abgedc fcb
bf afged adbegc ebfc gbadfce bdf fbcdeg bdcge efgdb fbadgc | cfeb ebcfgad febgcda fbd
fbeda dfega bf becda fba dfcb cagbed abfdec cfagbe aebdcfg | bdcf eacbd abdecg ebafdc
baecfd dg gbdc edagb bdaec ebgaf bcefadg dge eagcbd acgfde | deg dg deg bdacef
degabf gdbef cedg bgfcd dfacegb dcb dbgfec fcagb cedabf dc | gecd bdc gbedf acbfg
efdag ce cabe bcfdga egcad gcbad bdagce cde cdfebga dfgecb | agdec cde dagce cgade
adbgc bgecd ebdgcf dgafbce abcefg gefdab ec edcf dgfbe ebc | geabdfc edagbf efdc ec
deagf bdcf dgc fbegcd deabcfg cd edfgc aebgcd fecgab efcgb | gcefbd fbdc edcfbg efgbc
fbgedc bacged egbacf cbf gaecb fc fdcbeag ecaf cbgaf agdbf | cfagb bgacf eacbgd fgbca
abdeg gdcea bdfega fgadb eb bgfe aecdfb facbdg gdebfca abe | aeb efacdgb eba be
fcdgab cbgfa gc gfdc bcg fageb cbfgdea cgaebd fcdab dceafb | fcabg gc cfdg bcadfe
dfgcb ebgadc efb ecgba becfg feagbd cgebaf ceaf cgfbdea fe | fe bfe bef fcbgd
fabde cbdg gcbae fegbac acfgde edgab bedgacf deg cdbega gd | dcgb cgfeda eafdb egd
gfac bcaegf cf fcb ebcda edcbgaf dgfbce agfeb geafdb cabfe | ecadb fc ebadgf efcba
fbgcad bfcae cf afbeg dcfe cbf cbgaed ceadb bcedaf fabcged | adfegbc fbc ceabd fc
dabf dacbg fgabc db cgdafeb eacbgf cgfdba bgd dgcae gdfceb | bacegf cbgfed bd bd
dfec dgcabe cf bfdca fgadbce bfceag edabc fcb fdabg bcfeda | fbc bdfga efdc cbefag
edcbga fcagb gb dagcef fgeb egcfa dfbagec agb gcfeab dcfba | bcdefag ceagbfd efbg fecga
eacdgf cb ebc afgecb dbeaf cbfea ebfcdga edfgcb egafc acgb | efbad cebaf deafb aedbf
gedba fegdbc dgf deafg gceadf afcdeb gfca fg eadfc dbcfgea | gdacfbe gf faecbd egfad
fe gef adebgc fcde eadgc gfcaed bfcga gafce bdgcfea fbgeda | dabfge cefd afdgce feg
gafd feadbc cfbage ceabdgf edgcb acgbf ad fbadgc acdgb adb | ecbafd cdabg abd bad
gea defga egdc dafbg fbadec fbcega aedcf ge cgafde cabdfge | ge fdceag efcad cdbfea
gecdbfa bgdfca cdbfa ecdfba dgfca cbag ga ebdagf fdgec gaf | fgcdeab bcedaf gbca cgab
defcgb edcfg gcadf fac dgfcae bgafec cfagebd aced ac afdgb | afdcg dgfce fcegbad ac
eab cfdega ab bfgaec gbdfeca gdeca dfecb abgedc ebacd badg | gcafbed ecdagf bcfgade ba
cbd acdfbg bgefda cb fgedbc acfb bafdegc dgafb dbacg gaedc | bc baefgd gbdefa cb
edc gfead edgbfa efbca dc dcgbafe dcgf aecfd gafdce bdcgea | bfeca fbaec bfaec fdaec
dagef efgcbad gcbd ebagfc db eafcbd efcgb deb bedfg cfedgb | cgadbef bd dgacbfe befgd
gcefbad cebgaf efcgb bdge bdafc cdfgea de dfe bfdgec cebfd | dfecb de fdebc fde
fe aef cgbea dbfcga dfagce cbafed cebagdf cgeaf afcdg efgd | fadbce fe aegdcf ef
adbgf dcbfae cebgdaf bf gafde gdcba cdaegb fab gcbf dbcafg | adbgf gbedacf afb gcbaefd
cfagb geb dagbcf edbfa egdfacb efgba fcbeag eadcbg gecf eg | ge cfeg bafde afdbe
ge bfedca adgbf dfceb dfgaec egfbd gfcdbe fcgedba gebc ged | fcbde cgdafeb cdfaebg eg
cdebaf cgdefb fdbcega bdaf fgecad afc af abefc acgeb bcfde | abfd fbad fdecb geabc
edfga dcagb afgcbd facb dbegcf fb bgf gfcbdae gabfd cegadb | fbdcga fbdga fb gfb
dcegba dfb adbec cdbafe df fcbeg dbfce dfabcg edfa cbedafg | fd efgcb cbafed dagceb
afcbe cfa agbef bfgacd cf cgef cbgeafd aefbgc gefbad abcde | gfcabde afc fca fabgde
bacdge dfbc bc ecgfdab edgbcf cgafde gbaef cgefb ecb edfcg | bgdcef bgedafc cdaebgf cbfd
egdc cbdgfa def dcafe de dcgaf abefc dbaegf fdgcea ebgacfd | edgc gbcedaf fgcaed geadcfb
dbac bfdge cgb bcgde cb gbfdcea acfebg bdcgea adecfg edgca | dgeac feabcg aegcd gcb
dcbeg dcgef acdfg efabgcd dfaceb efgb fbcdge aegbcd ef efd | dfbcge bgef gcdef cfdag
dfgb gfc afcde egbcd cfgde cdbegf agbecf gf bcdeag fgdebca | becgd gf edgabc dfcabge
cd bdaefg cabfed cdgfbae bgceda eadbg egdc cabgd bcd fagbc | dbgac fedacb edbfacg dgce
acde faegd dfa bgeaf efacgd fbagcd da bcaefdg ecdgf febdgc | dfegc dgbcef adf cedfag
fag cbafe ecbfag gcbdf edfcba cgea bagefd agdcefb ag bagcf | fcabg ebagcf gdcfb egfbda
badf fgdbace gfced fdcea efacbd ade bcfeag ad cabef dacgbe | afbd edgcf fabd fagebc
ac cfdabge bgac gfade fdbgc dac dbcfge dgcfa dcgfba fbdcae | cbagdf geadf dbcagf adc
dcgba dc gadfeb fcdg baedcf aegbc dbacgf eagbfdc bdc gbdaf | abgcd cbd gbfad gbcea
bfagec fcbeg ce dfagcb bfcade ebc dfegb acgdbfe gcae agcbf | gcae afdgbec bfagc ebagfcd
bgacf gfdabc abgcef fdab cdbag decbg geadcf ebfacdg ad cad | bcaefg cgbdaf bgcaefd agbcf
fbadeg gbe dgcbea gb bcgd bdecgaf agecb cegda cefadg bacef | aedgc cgdb aegcd agdcef
gbecdf aefg eg gec bcefa gcbad egcba cefbad fecgab badfecg | ge afbec edfcba agcfdbe
fbga cedbf ba ebagdf baegdfc aeb bagced gfcdea bfead afged | gdafce ba eba efcdgab
beafdc bca defac ab edfcga edcbg cabed bacgdfe gbadcf eabf | cfdage cafbde efcbda cdgeaf
efg agfcde abgfd efbc cdebg febgd ef cdgbae fegbdc befgcad | ef efbc dfgba fge
acgfb eabgc cfdab fg afg gcef gfdbea becfag beafdcg gebcda | fgec gefc agbefc cgfdeba
adfeg cgdfeab feba fgeabd dgabe egbcfd aebgdc def cgdaf ef | febgda adfgc bgdcea gadfe
cgabf bcg bfgd edbcgaf acegf adbefc ebadcg bg cdbfa cbfdga | eadcbf deagfbc fcage dfbgac
dge ceabdg fdbce cedgb acfdgb cbdagfe gdabc gabe fdaceg ge | eg gde cdebf abecdg
cdage eagcf ade gebcaf faecgd gcbed abdfeg cdaf ad degbcfa | bdgec aegcd adcgbfe feacbg
debg gec dbfegca ge acdeb acgfd abegfc bcadge eadgc efdacb | cfdbae ge cgabef dgafc
gcfabe ed adcgf febac bgdfea dfaec deafcb acfbegd dcbe ade | fcgda dea fcdag de
bdfecg adgbefc dfbeg dabecf agefd gdba ad dfa faecg beadfg | cgfabed abdg cfdgbae adefbc
cdbge cbaegd cde afcdbg cbadegf efgadc agdcb fgcbe ed daeb | ecd ecd dcgeab dbcge
ebcg fbgae fbaec cefbgda ecf bdfac efbadg gfceda cfbage ec | cfdage ec caebgf cgeb
cgfbead fed fgecda dfeagb ecfg efcda cfbda fe dcbgae edacg | fedac efd ceadg cgdae
dgbae acbfedg acbe ceagd gacebd dgbefc cadfg ecg fdbaeg ec | dgfbae ec fedbcag abec
ecbgadf ab afbe fgcba fgcead bgfaec cgafe dgabec dfcgb abg | bafe bfea cgbdea ba
cf dfbce dfc befda abdefcg gaebdc dfacbg cefg gbdec fgbedc | cdf cabgdf cfdabg bgecd
gbadef bcfd gabedfc bd cbfag fegbac gcdab gafbdc dgeac bgd | db dbaegf gaebfd cgaed
ebgafc ecg agfcd ecab dbfgea eagcbfd edcbgf bgaef ce acegf | egbfa bcgfaed abec ce
acdfbg afgdb ea bea ebgda agecfbd bcgde cfgeab aefd defgba | agbed ae fgbaed defa
gcebadf ed bafce bgcfad daefb bfadg aefbgd fgcdeb daeg ebd | cdgfba ecbfdg edbaf gade`));
//# sourceMappingURL=day08.js.map