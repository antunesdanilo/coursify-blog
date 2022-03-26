import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useStateIfMounted} from 'use-state-if-mounted';

import MediaInterface from '../Interfaces/media.interface';

import PostItemPropsInterface from '../Interfaces/post-item.props.interface';

import postService from '../Services/post.service';

const regex = /(<([^>]+)>)/gi;

const PostItem: React.FC<PostItemPropsInterface> = ({navigation, post}) => {
  const [media, setMedia] = useStateIfMounted<MediaInterface | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      postService.viewMidia(post.featured_media).then((r2: any) => {
        setMedia(r2);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.post}>
      <TouchableOpacity
        onPress={() => navigation.push('Post', {postId: post.id})}>
        <Image
          style={styles.image}
          source={{uri: media?.media_details.sizes.medium.source_url}}
        />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {post.title.rendered}
        </Text>
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.preview}>
          {post.content.rendered.replace(regex, '')}
        </Text>
        <Text style={styles.readMore}>Leia Mais</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: 220,
    height: 308,
    marginRight: 20,
    borderRadius: 10,
  },
  image: {
    width: 220,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: '#2AB598',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 20,
    height: 65,
    padding: 10,
  },
  preview: {
    fontSize: 17,
    lineHeight: 21,
    padding: 10,
  },
  readMore: {
    color: '#FDA506',
    fontWeight: 'bold',
    fontSize: 17,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PostItem;
