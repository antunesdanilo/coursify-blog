import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Toolbar from '../Components/Toolbar';
import Footer from '../Components/Footer';

import PostInterface from '../Interfaces/post.interface';

import postService from '../Services/post.service';

import RenderHtml from 'react-native-render-html';

const {width} = Dimensions.get('window');

const Post: React.FC<{navigation: any; route: any}> = ({navigation, route}) => {
  const [post, setPost] = React.useState<PostInterface>();

  useFocusEffect(
    React.useCallback(() => {
      postService.viewPost(route.params.postId).then((r: any) => {
        setPost(r);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View>
      <Toolbar navigation={navigation} back={true} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{post?.title.rendered}</Text>
        <View style={styles.content}>
          <RenderHtml
            enableExperimentalMarginCollapsing={true}
            contentWidth={width - 30}
            tagsStyles={{p: {fontSize: 20}, span: {fontSize: 20}}}
            source={{html: post?.content.rendered || ''}}
          />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#1ABC9C',
    textAlign: 'left',
    fontSize: 21,
    lineHeight: 28,
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  content: {
    marginHorizontal: 15,
  },
});

export default Post;
