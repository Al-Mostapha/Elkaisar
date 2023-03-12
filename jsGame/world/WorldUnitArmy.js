/* global WorldUnit */

const army_mo3_and_mon = {
    "1": {
        "type_1": "army_a",
        "amount_1": 10,
        "type_2": "army_d",
        "amount_2": 8
    },
    "2": {
        "type_1": "army_a",
        "amount_1": 16,
        "type_2": "army_d",
        "amount_2": 11
    },
    "3": {
        "type_1": "army_a",
        "amount_1": 26,
        "type_2": "army_d",
        "amount_2": 18
    },
    "4": {
        "type_1": "army_a",
        "amount_1": 38,
        "type_2": "army_d",
        "amount_2": 23
    },
    "5": {
        "type_1": "army_a",
        "amount_1": 47,
        "type_2": "army_d",
        "amount_2": 31
    },
    "6": {
        "type_1": "army_a",
        "amount_1": 60,
        "type_2": "army_d",
        "amount_2": 36
    },
    "7": {
        "type_1": "army_a",
        "amount_1": 70,
        "type_2": "army_d",
        "amount_2": 44
    },
    "8": {
        "type_1": "army_a",
        "amount_1": 81,
        "type_2": "army_d",
        "amount_2": 10
    },
    "9": {
        "type_1": "army_a",
        "amount_1": 91,
        "type_2": "army_d",
        "amount_2": 59
    },
    "10": {
        "type_1": "army_a",
        "amount_1": 110,
        "type_2": "army_d",
        "amount_2": 98
    },
    "11": {
        "type_1": "army_a",
        "amount_1": 190,
        "type_2": "army_e",
        "amount_2": 54
    },
    "12": {
        "type_1": "army_a",
        "amount_1": 271,
        "type_2": "army_e",
        "amount_2": 54
    },
    "13": {
        "type_1": "army_a",
        "amount_1": 350,
        "type_2": "army_e",
        "amount_2": 72
    },
    "14": {
        "type_1": "army_a",
        "amount_1": 427,
        "type_2": "army_e",
        "amount_2": 88
    },
    "15": {
        "type_1": "army_a",
        "amount_1": 509,
        "type_2": "army_e",
        "amount_2": 104
    },
    "16": {
        "type_1": "army_a",
        "amount_1": 589,
        "type_2": "army_e",
        "amount_2": 19
    },
    "17": {
        "type_1": "army_a",
        "amount_1": 666,
        "type_2": "army_e",
        "amount_2": 137
    },
    "18": {
        "type_1": "army_a",
        "amount_1": 745,
        "type_2": "army_e",
        "amount_2": 153
    },
    "19": {
        "type_1": "army_a",
        "amount_1": 824,
        "type_2": "army_e",
        "amount_2": 168
    },
    "20": {
        "type_1": "army_a",
        "amount_1": 9003,
        "type_2": "army_e",
        "amount_2": 185
    },
    "21": {
        "type_1": "army_b",
        "amount_1": 787,
        "type_2": "army_e",
        "amount_2": 1093
    },
    "22": {
        "type_1": "army_b",
        "amount_1": 1381,
        "type_2": "army_e",
        "amount_2": 1920
    },
    "23": {
        "type_1": "army_b",
        "amount_1": 1976,
        "type_2": "army_e",
        "amount_2": 2747
    },
    "24": {
        "type_1": "army_b",
        "amount_1": 2570,
        "type_2": "army_e",
        "amount_2": 3573
    },
    "25": {
        "type_1": "army_b",
        "amount_1": 3163,
        "type_2": "army_e",
        "amount_2": 4400
    },
    "26": {
        "type_1": "army_b",
        "amount_1": 3759,
        "type_2": "army_e",
        "amount_2": 5227
    },
    "27": {
        "type_1": "army_b",
        "amount_1": 4352,
        "type_2": "army_e",
        "amount_2": 6053
    },
    "28": {
        "type_1": "army_b",
        "amount_1": 4948,
        "type_2": "army_e",
        "amount_2": 6880
    },
    "29": {
        "type_1": "army_b",
        "amount_1": 5541,
        "type_2": "army_e",
        "amount_2": 7707
    },
    "30": {
        "type_1": "army_b",
        "amount_1": 5541,
        "type_2": "army_e",
        "amount_2": 7707
    },
    "31": {
        "type_1": "army_b",
        "amount_1": 6719,
        "type_2": "army_f",
        "amount_2": 1938
    },
    "32": {
        "type_1": "army_b",
        "amount_1": 5153,
        "type_2": "army_f",
        "amount_2": 1477
    },
    "33": {
        "type_1": "army_b",
        "amount_1": 5583,
        "type_2": "army_f",
        "amount_2": 1602
    },
    "34": {
        "type_1": "army_b",
        "amount_1": 6013,
        "type_2": "army_f",
        "amount_2": 1725
    },
    "35": {
        "type_1": "army_b",
        "amount_1": 6442,
        "type_2": "army_f",
        "amount_2": 1847
    },
    "36": {
        "type_1": "army_b",
        "amount_1": 6872,
        "type_2": "army_f",
        "amount_2": 1972
    },
    "37": {
        "type_1": "army_b",
        "amount_1": 7301,
        "type_2": "army_f",
        "amount_2": 2217
    },
    "38": {
        "type_1": "army_b",
        "amount_1": 7731,
        "type_2": "army_f",
        "amount_2": 2217
    },
    "39": {
        "type_1": "army_b",
        "amount_1": 8160,
        "type_2": "army_f",
        "amount_2": 2342
    },
    "40": {
        "type_1": "army_b",
        "amount_1": 8588,
        "type_2": "army_f",
        "amount_2": 2465
    },
    "41": {
        "type_1": "army_a",
        "amount_1": 8295,
        "type_2": "army_f",
        "amount_2": 4192
    },
    "42": {
        "type_1": "army_c",
        "amount_1": 8295,
        "type_2": "army_f",
        "amount_2": 4192
    },
    "43": {
        "type_1": "army_c",
        "amount_1": 11712,
        "type_2": "army_f",
        "amount_2": 5919
    },
    "44": {
        "type_1": "army_c",
        "amount_1": 18544,
        "type_2": "army_f",
        "amount_2": 9371
    },
    "45": {
        "type_1": "army_c",
        "amount_1": 21959,
        "type_2": "army_f",
        "amount_2": 11098
    },
    "46": {
        "type_1": "army_c",
        "amount_1": 25376,
        "type_2": "army_f",
        "amount_2": 12824
    },
    "47": {
        "type_1": "army_c",
        "amount_1": 28762,
        "type_2": "army_f",
        "amount_2": 14551
    },
    "48": {
        "type_1": "army_c",
        "amount_1": 32208,
        "type_2": "army_f",
        "amount_2": 16276
    },
    "49": {
        "type_1": "army_c",
        "amount_1": 35625,
        "type_2": "army_f",
        "amount_2": 18003
    },
    "50": {
        "type_1": "army_c",
        "amount_1": 35625,
        "type_2": "army_f",
        "amount_2": 18003
    }
};
var ARMY_ASIAN_SQUAD = {};

ARMY_ASIAN_SQUAD[WUT_FRONT_SQUAD] = {// الفرقة الامامية
    army_a: 0,
    army_b: 0,
    army_c: 16002,
    army_d: 0,
    army_e: 0,
    army_f: 4002
};
ARMY_ASIAN_SQUAD[WUT_FRONT_BAND] = {// السرية الامامية
    army_a: 0,
    army_b: 0,
    army_c: 24006,
    army_d: 0,
    army_e: 0,
    army_f: 6006
};
ARMY_ASIAN_SQUAD[WUT_FRONT_SQUADRON] = {// الجماعة الامامية
    army_a: 0,
    army_b: 0,
    army_c: 32004,
    army_d: 0,
    army_e: 0,
    army_f: 8004
};
ARMY_ASIAN_SQUAD[WUT_FRONT_DIVISION] = {// الكتيبة الامامية
    army_a: 0,
    army_b: 0,
    army_c: 40002,
    army_d: 0,
    army_e: 0,
    army_f: 10002
};
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_SQUAD] = {//  فرقة التسليح الخفيف
    army_a: 0,
    army_b: 0,
    army_c: 56010,
    army_d: 0,
    army_e: 0,
    army_f: 14010
};
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_BAND] = {//  سرية التسليح الخفيف
    army_a: 0,
    army_b: 0,
    army_c: 64089,
    army_d: 0,
    army_e: 0,
    army_f: 16029
};
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_SQUADRON] = {//  جماعة التسليح الخفيف
    army_a: 0,
    army_b: 0,
    army_c: 72006,
    army_d: 0,
    army_e: 0,
    army_f: 18006
};
ARMY_ASIAN_SQUAD[WUT_ARMY_LIGHT_DIVISION] = {//  كتيبة التسليح الخفيف
    army_a: 0,
    army_b: 0,
    army_c: 80007,
    army_d: 0,
    army_e: 0,
    army_f: 20010
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_SQUAD] = {//  فرقة التسليح الثقيل
    army_a: 0,
    army_b: 0,
    army_c: 95772,
    army_d: 0,
    army_e: 0,
    army_f: 23952
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_BAND] = {//  سرية التسليح الثقيل
    army_a: 0,
    army_b: 0,
    army_c: 104466,
    army_d: 0,
    army_e: 0,
    army_f: 26124
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_SQUADRON] = {//  جماعة التسليح الثقيل
    army_a: 0,
    army_b: 0,
    army_c: 112335,
    army_d: 0,
    army_e: 0,
    army_f: 28095
};
ARMY_ASIAN_SQUAD[WUT_ARMY_HEAVY_DIVISION] = {//  كتيبة التسليح الثقيل
    army_a: 0,
    army_b: 0,
    army_c: 120009,
    army_d: 0,
    army_e: 0,
    army_f: 30012
};
ARMY_ASIAN_SQUAD[WUT_GUARD_SQUAD] = {//  فرقة الحراسة 
    army_a: 0,
    army_b: 0,
    army_c: 132996,
    army_d: 0,
    army_e: 0,
    army_f: 34011
};
ARMY_ASIAN_SQUAD[WUT_GUARD_BAND] = {//  سرية الحراسة 
    army_a: 0,
    army_b: 0,
    army_c: 144162,
    army_d: 0,
    army_e: 0,
    army_f: 36051
};
ARMY_ASIAN_SQUAD[WUT_GUARD_SQUADRON] = {//  جماعة الحراسة 
    army_a: 0,
    army_b: 0,
    army_c: 152772,
    army_d: 0,
    army_e: 0,
    army_f: 38208
};
ARMY_ASIAN_SQUAD[WUT_GUARD_DIVISION] = {//  كتيبة الحراسة 
    army_a: 0,
    army_b: 0,
    army_c: 165615,
    army_d: 0,
    army_e: 0,
    army_f: 41424
};
ARMY_ASIAN_SQUAD[WUT_BRAVE_THUNDER] = {// الثاندر الشجاع
    army_a: 0,
    army_b: 0,
    army_c: 248427,
    army_d: 0,
    army_e: 0,
    army_f: 62130
};
var ARMY_GANGSTAR = {};

ARMY_GANGSTAR[WUT_GANG] = {// الفرقة الامامية
    army_a: 486,
    army_b: 0,
    army_c: 0,
    army_d: 392,
    army_e: 0,
    army_f: 0
};
ARMY_GANGSTAR[WUT_MUGGER] = {// السرية الامامية
    army_a: 322,
    army_b: 0,
    army_c: 0,
    army_d: 206,
    army_e: 0,
    army_f: 0
};
ARMY_GANGSTAR[WUT_THIEF] = {// الجماعة الامامية
    army_a: 243,
    army_b: 0,
    army_c: 0,
    army_d: 153,
    army_e: 0,
    army_f: 0
};

var ARMY_CARTHIAN = {};

ARMY_CARTHIAN[WUT_CARTHAGE_GANG] = {// الفرقة الامامية
    "1": {
        army_a: 10400,
        army_b: 0,
        army_c: 0,
        army_d: 5200,
        army_e: 0,
        army_f: 0
    },
    "2": {
        army_a: 10400,
        army_b: 0,
        army_c: 0,
        army_d: 5200,
        army_e: 0,
        army_f: 0
    },
    "3": {
        army_a: 10400,
        army_b: 0,
        army_c: 0,
        army_d: 5200,
        army_e: 0,
        army_f: 0
    },
    "4": {
        army_a: 10400,
        army_b: 0,
        army_c: 0,
        army_d: 5200,
        army_e: 0,
        army_f: 0
    },
    "5": {
        army_a: 31200,
        army_b: 7800,
        army_c: 0,
        army_d: 31200,
        army_e: 0,
        army_f: 0
    },
    "6": {
        army_a: 11700,
        army_b: 0,
        army_c: 0,
        army_d: 9100,
        army_e: 0,
        army_f: 0
    },
    "7": {
        army_a: 11700,
        army_b: 0,
        army_c: 0,
        army_d: 9100,
        army_e: 0,
        army_f: 0
    },
    "8": {
        army_a: 11700,
        army_b: 0,
        army_c: 0,
        army_d: 9100,
        army_e: 0,
        army_f: 0
    },
    "9": {
        army_a: 11700,
        army_b: 0,
        army_c: 0,
        army_d: 9100,
        army_e: 0,
        army_f: 0
    },
    "10": {
        army_a: 46800,
        army_b: 7800,
        army_c: 0,
        army_d: 31200,
        army_e: 5850,
        army_f: 0
    }

};
ARMY_CARTHIAN[WUT_CARTHAGE_TEAMS   ] = {// السرية الامامية
    "1": {
        army_a: 15600,
        army_b: 2600,
        army_c: 0,
        army_d: 10400,
        army_e: 1950,
        army_f: 0
    },
    "2": {
        army_a: 15600,
        army_b: 2600,
        army_c: 0,
        army_d: 10400,
        army_e: 1950,
        army_f: 0
    },
    "3": {
        army_a: 15600,
        army_b: 2600,
        army_c: 0,
        army_d: 10400,
        army_e: 1950,
        army_f: 0
    },
    "4": {
        army_a: 15600,
        army_b: 2600,
        army_c: 0,
        army_d: 10400,
        army_e: 1950,
        army_f: 0
    },
    "5": {
        army_a: 78000,
        army_b: 23400,
        army_c: 0,
        army_d: 46800,
        army_e: 11700,
        army_f: 0
    },
    "6": {
        army_a: 20800,
        army_b: 5200,
        army_c: 0,
        army_d: 13000,
        army_e: 1950,
        army_f: 0
    },
    "7": {
        army_a: 20800,
        army_b: 5200,
        army_c: 0,
        army_d: 13000,
        army_e: 1950,
        army_f: 0
    },
    "8": {
        army_a: 20800,
        army_b: 5200,
        army_c: 0,
        army_d: 13000,
        army_e: 1950,
        army_f: 0
    },
    "9": {
        army_a: 20800,
        army_b: 5200,
        army_c: 0,
        army_d: 13000,
        army_e: 1950,
        army_f: 0
    },
    "10": {
        army_a: 0,
        army_b: 65000,
        army_c: 13000,
        army_d: 0,
        army_e: 32500,
        army_f: 6500
    }
};
ARMY_CARTHIAN[WUT_CARTHAGE_REBELS  ] = {// الجماعة الامامية
    "1": {
        army_a: 0,
        army_b: 22554,
        army_c: 86136,
        army_d: 0,
        army_e: 26922,
        army_f: 0
    },
    "2": {
        army_a: 0,
        army_b: 22554,
        army_c: 86136,
        army_d: 0,
        army_e: 26922,
        army_f: 0
    },
    "3": {
        army_a: 0,
        army_b: 22554,
        army_c: 86136,
        army_d: 0,
        army_e: 26922,
        army_f: 0
    },
    "4": {
        army_a: 0,
        army_b: 22554,
        army_c: 86136,
        army_d: 0,
        army_e: 26922,
        army_f: 0
    },
    "5": {
        army_a: 0,
        army_b: 67662,
        army_c: 258408,
        army_d: 0,
        army_e: 80766,
        army_f: 0
    },
    "6": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "7": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "8": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "9": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "10": {
        army_a: 0,
        army_b: 0,
        army_c: 435000,
        army_d: 0,
        army_e: 0,
        army_f: 110000
    }
};
ARMY_CARTHIAN[WUT_CARTHAGE_FORCES  ] = {// الفرقة الامامية
    "1": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "2": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "3": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "4": {
        army_a: 0,
        army_b: 0,
        army_c: 108690,
        army_d: 0,
        army_e: 0,
        army_f: 26922
    },
    "5": {
        army_a: 0,
        army_b: 0,
        army_c: 435000,
        army_d: 0,
        army_e: 0,
        army_f: 110000
    },
    "6": {
        army_a: 0,
        army_b: 0,
        army_c: 188690,
        army_d: 0,
        army_e: 0,
        army_f: 46922
    },
    "7": {
        army_a: 0,
        army_b: 0,
        army_c: 188690,
        army_d: 0,
        army_e: 0,
        army_f: 46922
    },
    "8": {
        army_a: 0,
        army_b: 0,
        army_c: 188690,
        army_d: 0,
        army_e: 0,
        army_f: 46922
    },
    "9": {
        army_a: 0,
        army_b: 0,
        army_c: 188690,
        army_d: 0,
        army_e: 0,
        army_f: 46922
    },
    "10": {
        army_a: 0,
        army_b: 0,
        army_c: 635000,
        army_d: 0,
        army_e: 0,
        army_f: 210000
    }
};
ARMY_CARTHIAN[WUT_CARTHAGE_CAPITAL ] = {// السرية الامامية
    "1": {
        army_a: 0,
        army_b: 0,
        army_c: 326070,
        army_d: 0,
        army_e: 0,
        army_f: 80766
    },
    "2": {
        army_a: 0,
        army_b: 0,
        army_c: 326070,
        army_d: 0,
        army_e: 0,
        army_f: 80766
    },
    "3": {
        army_a: 0,
        army_b: 0,
        army_c: 326070,
        army_d: 0,
        army_e: 0,
        army_f: 80766
    },
    "4": {
        army_a: 0,
        army_b: 0,
        army_c: 326070,
        army_d: 0,
        army_e: 0,
        army_f: 80766
    },
    "5": {
        army_a: 0,
        army_b: 0,
        army_c: 793482,
        army_d: 0,
        army_e: 0,
        army_f: 322140
    },
    "6": {
        army_a: 0,
        army_b: 0,
        army_c: 396741,
        army_d: 0,
        army_e: 0,
        army_f: 161070
    },
    "7": {
        army_a: 0,
        army_b: 0,
        army_c: 396741,
        army_d: 0,
        army_e: 0,
        army_f: 161070
    },
    "8": {
        army_a: 0,
        army_b: 0,
        army_c: 396741,
        army_d: 0,
        army_e: 0,
        army_f: 161070
    },
    "9": {
        army_a: 0,
        army_b: 0,
        army_c: 396741,
        army_d: 0,
        army_e: 0,
        army_f: 161070
    },
    "10": {
        army_a: 0,
        army_b: 0,
        army_c: 1586979,
        army_d: 0,
        army_e: 0,
        army_f: 644280
    }
};