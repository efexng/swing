<FlatList
data={[]}
ListHeaderComponent={() => (
  <View>
    <View style={styles.headercontent}>
      <Text style={[styles.Company, textStyle]}>Cinemas in your area</Text>

      <CinemaCompaniesList />

      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.skipButton}>
        <Text style={styles.skipText}>Change Location</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.headercontentsub3}>
      <Text style={[styles.headercontentsub2txt, textStyle]}>Movies showing this week</Text>
    </View>
    <View style={styles.headercontentsubs3}>
      <View style={styles.headercontentsubinner3}>
      {isDarkMode ? <LocationIconWhite /> : <LocationIcon />}
        <Text style={[styles.headercontentsubinner3txt, textStyle]}>Near Gwagwalada, Abuja </Text>
      </View>

      <TouchableOpacity onPress={toggleDropdown} style={[styles.headercontentsubinner4, isExpanded && activeGenreStyle ]}>
      <Text style={[styles.headercontentsubinner3txt2, textStyle, isExpanded ]}>{isExpanded ? "All Genre" : "All Genre"}</Text>
        <View >
        {isExpanded 
  ? (isDarkMode ? <ChevronUpIConWhite /> : <ChevronUpICon />) 
  : (isDarkMode ? <ChevronDownIConWhite /> : <ChevronDownICon />)
}
        </View>
      </TouchableOpacity>
    </View>
   <View style={styles.dropdown}>
   {isExpanded && (
      <View style={dropdownContainerStyle}>
        <FlatList
          data={Genre}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.genreItem} onPress={() => selectGenre(item)}>
              <Text style={[styles.genreText, textStyle]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )}
   </View>
    <View style={styles.headercontentsubs4}>
      <Text style={[styles.headercontentsubs4txt, textStyle]}>Genesis Cinema</Text>
    </View>
    <View style={styles.moviescontainer}>
      <CinemaScreenMovieList />
    </View>
    <View style={styles.moviesbtncontainer}>
      <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.moviesbtn}>
        <Text style={styles.moviesbtntxt}>See All</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.headercontentsubs4}>
      <Text style={[styles.headercontentsubs5txt, textStyle]}>SILVERBIRD ENTERTAINMENT CENTER</Text>
    </View>
    <View style={styles.moviescontainer}>
      <CinemaScreenMovieList />
    </View>
    <View style={styles.moviesbtncontainer}>
      <TouchableOpacity onPress={() => navigation.navigate('OnBoardingScreen2')} style={styles.moviesbtn}>
        <Text style={styles.moviesbtntxt}>See All</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
keyExtractor={(item, index) => index.toString()}
showsVerticalScrollIndicator={false}
/>